const crypto = require('crypto');

// Web way
async function digestMessage(message) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return hashBuffer;
  }

function bufferToHex(buffer) {
    const hashArray = Array.from(new Uint8Array(buffer));                     // convert buffer to byte array
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
}

function makeHash(algorithm, input) {
    let hash = crypto.createHash(algorithm).update(input).digest('base64');
    console.log(input, algorithm, hash);
}

async function main() {
    console.log('Available hash algorithms');
    console.log(crypto.getHashes());

    const input = "Jack";

    makeHash('sha256', input);
    makeHash('sha3-256', input);
    makeHash('md5', input); // insecure
    makeHash('ripemd160', input);
    makeHash('shake256', input);
    makeHash('whirlpool', input);
    makeHash('blake2b512', input);
}

main();