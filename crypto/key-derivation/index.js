const scrypt = require('scrypt-js');
const base64js = require('base64-js')

const safeAscii = /^[A-Za-z0-9!@#$%^&*()]+$/;
function checkSafeAsciiPassword(password) {
    if (!safeAscii.test(password)) throw new Error('Password should only use upper and lower case English letters, digits and symbols !@#$%^&*()');
}

function normalizeUnicodePassword(password) {
    return password.normalize('NFKC');
}

async function main() {
    const password = "Password123!";
    const salt = "abcdefg12345678";
    const keyLengthBits = 256;

    const keyLengthBytes = keyLengthBits / 8;

    const normalizedPassword = normalizeUnicodePassword(password);
    const bufferPassword = Buffer.from(normalizedPassword);

    const n = 1024, r = 80, p = 1;
    const key = await scrypt.scrypt(bufferPassword, Buffer.from(salt), n, r, p, keyLengthBytes)
    console.log(normalizedPassword, salt, n, r, p, key.length, base64js.fromByteArray(key));
}

main();
