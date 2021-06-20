const crypto = require('crypto');
const base64js = require('base64-js')

// const browserRandom = window.crypto.getRandomValues();
const nodeRandom = crypto.randomBytes(32);
console.log(nodeRandom.length, base64js.fromByteArray(nodeRandom));