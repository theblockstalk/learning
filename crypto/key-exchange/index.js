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

const A = ec.genKeyPair();
const B = ec.genKeyPair();
const C = ec.genKeyPair();

const AB = A.getPublic().mul(B.getPrivate())
const BC = B.getPublic().mul(C.getPrivate())
const CA = C.getPublic().mul(A.getPrivate())

const ABC = AB.mul(C.getPrivate())
const BCA = BC.mul(A.getPrivate())
const CAB = CA.mul(B.getPrivate())

console.log(ABC.getX().toString(16))
console.log(BCA.getX().toString(16))
console.log(CAB.getX().toString(16))