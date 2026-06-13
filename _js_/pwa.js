// PWA: registro del service worker + banner "Añadir a pantalla de inicio".
// Mismo patrón A2HS que _modules_/noxtr/script.js en noxtr.net: Chrome casi nunca
// muestra su aviso nativo, así que capturamos beforeinstallprompt y mostramos el nuestro.
(function() {

    // ==================== SERVICE WORKER ====================

    if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('_js_/sw.js').catch(function(err) {
                if (window.console && console.warn) console.warn('Service worker registration failed:', err);
            });
        });
    }

    // ==================== ADD TO HOME SCREEN ====================

    // Textos: es/en según _LANG_ (los _i18n_/*.js no definen cadenas A2HS).
    function txt(es, en) {
        return (typeof _LANG_ !== 'undefined' && _LANG_ === 'es') ? es : en;
    }

    var A2HS = {
        _prompt: null,

        init: function() {
            // Skip si ya corre como PWA instalada
            if (window.matchMedia('(display-mode: standalone)').matches) return;
            if (window.navigator.standalone === true) return;
            // Skip en escritorio (sin pantalla táctil)
            if (!('ontouchstart' in window) && !navigator.maxTouchPoints) return;
            // Skip si se descartó hace menos de 7 días
            try {
                var ts = localStorage.getItem('signer_a2hs_ts');
                if (ts && Date.now() - parseInt(ts, 10) < 7 * 86400000) return;
            } catch(e) {}

            var ua = navigator.userAgent;
            var isIOS = /iPhone|iPad|iPod/i.test(ua) && !window.MSStream;
            var isIOSSafari = isIOS && /Safari/i.test(ua) && !/CriOS|FxiOS|OPiOS/i.test(ua);

            // Android/Chrome: interceptar el prompt nativo de instalación
            window.addEventListener('beforeinstallprompt', function(e) {
                e.preventDefault();
                A2HS._prompt = e;
                setTimeout(function() { A2HS._show(true); }, 3500);
            });

            // iOS Safari: banner con instrucciones manuales
            if (isIOSSafari) {
                setTimeout(function() { A2HS._show(false); }, 3500);
            }
        },

        _show: function(native) {
            if (document.getElementById('signer-a2hs')) return;
            var msg, btn;

            if (native) {
                msg = txt('<b>Instalar Noxtr Signer</b> en tu pantalla de inicio para acceso rápido',
                          '<b>Install Noxtr Signer</b> on your home screen for quick access');
                btn = '<button id="signer-a2hs-btn">' + txt('Instalar', 'Install') + '</button>';
            } else {
                msg = txt('<b>Instala Noxtr Signer:</b> toca el botón Compartir (&#9650;) y luego <b>&laquo;Añadir a inicio&raquo;</b>',
                          '<b>Install Noxtr Signer:</b> tap the Share button (&#9650;) then <b>&laquo;Add to Home Screen&raquo;</b>');
                btn = '';
            }

            var el = document.createElement('div');
            el.id = 'signer-a2hs';
            el.innerHTML = '<span class="signer-a2hs-msg">' + msg + '</span>'
                + '<div class="signer-a2hs-actions">' + btn + '</div>'
                + '<button id="signer-a2hs-close" title="' + txt('Cerrar', 'Dismiss') + '">&#10005;</button>';
            document.body.appendChild(el);
            requestAnimationFrame(function() { el.classList.add('visible'); });

            if (native && A2HS._prompt) {
                document.getElementById('signer-a2hs-btn').onclick = async function() {
                    A2HS._prompt.prompt();
                    await A2HS._prompt.userChoice;
                    el.remove();
                    A2HS._prompt = null;
                };
            }

            document.getElementById('signer-a2hs-close').onclick = function() {
                el.classList.remove('visible');
                setTimeout(function() { el.remove(); }, 300);
                try { localStorage.setItem('signer_a2hs_ts', String(Date.now())); } catch(e) {}
            };
        }
    };

    A2HS.init();

})();
