// Noxtr Signer — relays propios del bunker (EDITABLE POR EL USUARIO)
//
// En estos relays escucha el signer para el pairing bunker:// y por ellos
// responde a las apps. Pon los tuyos (solo wss://); con que uno funcione, vale.
// Si borras este archivo o lo dejas inválido, el signer usa sus relays por defecto.
//
// Nota: las apps que conectan por nostrconnect:// traen sus propios relays en la
// URI; esos no se configuran aquí.

var SIGNER_RELAYS = [
    'wss://relay.damus.io',
    'wss://nos.lol',
    'wss://relay.primal.net'
];

// Dirección lightning para las propinas del banner "Apoya este desarrollo".
// PON AQUÍ LA TUYA (lightning address o LNURL). Si se deja vacía, el botón no hace nada.
var SIGNER_TIP_LN = 'erwin@noxtr.net';
