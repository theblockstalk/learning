const crypto = require('crypto');
var sys = require('sys')
var exec = require('child_process').exec;

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
    const input = "Jack";

    makeHash('sha256', input);
    makeHash('md5', input);
    makeHash('ripemd160', input);
    makeHash('shake256', input);
    makeHash('sm3', input);
    makeHash('whirlpool', input);

    exec("openssl list -digest-algorithms", function(err, stdout, stderr) {
        console.log('Hash algorithms supported by openssl on system')
        console.log(stdout);
      });
}

main();