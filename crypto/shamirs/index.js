const sss = require('shamirs-secret-sharing');
const base64js = require('base64-js')

const secret = Buffer.from('secret key');
const shares = sss.split(secret, { shares: 10, threshold: 4 });
console.log(shares.map(share => base64js.fromByteArray(share)));

const recovered = sss.combine(shares.slice(3, 7));
console.log(recovered.toString());