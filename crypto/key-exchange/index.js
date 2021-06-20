const EC = require('elliptic').ec;
const ec = new EC('curve25519');

// Generate keys
const key1 = ec.genKeyPair();
const key2 = ec.genKeyPair();

const shared1 = key1.derive(key2.getPublic());
const shared2 = key2.derive(key1.getPublic());

console.log('Both shared secrets are BN instances');
console.log(shared1.toString(16));
console.log(shared2.toString(16));