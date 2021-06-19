const scrypt = require('scrypt-js');
const base64js = require('base64-js')

const safeAscii = /^[A-Za-z0-9!@#$%^&*()]+$/;
function checkSafeAsciiPassword(password) {
    if (!safeAscii.test(password)) throw new Error('Password should only use upper and lower case English letters, digits and symbols !@#$%^&*()');
}

function normalizeUnicodePassword(password) {
    return password.normalize('NFKC');
}

let previousMemory = {}, firstTime = true;
function printMemory(msg = '') {
    const used = process.memoryUsage();
    console.log(msg === '' ? msg : '\n' + msg);
    for (let key in used) {
        if (!firstTime) {
            console.log(`${key} ${Math.round((used[key] - previousMemory[key]) / 1024 / 1024 * 100) / 100} MB`);
        }
        previousMemory[key] = used[key];
    }
    firstTime = false;
}

function getMemory() {
    const used = process.memoryUsage();
    return used.rss;
}

function bytesToMegabytes(bytes) {
    return Math.round(bytes / 1024 / 1024 * 100) / 100;
}

async function main() {
    const password = "Password123!";
    const salt = "abcdefg12345678";
    const keyLengthBits = 256;

    const keyLengthBytes = keyLengthBits / 8;

    const normalizedPassword = normalizeUnicodePassword(password);
    const bufferPassword = Buffer.from(normalizedPassword);

    // Parameters used for my crypto wallet
    const n = 8192, r = 8, p = 1;
    // Need to call once before measuring to initalize library codebase
    let key = await scrypt.scrypt(bufferPassword, Buffer.from(salt), n, r, p, keyLengthBytes);
    
    const startTime = new Date();
    key = await scrypt.scrypt(bufferPassword, Buffer.from(salt), n, r, p, keyLengthBytes);
    const endTime = new Date();
    const durationMilli = endTime.getTime() - startTime.getTime();
    const memoryUsed = 128 * n * r * p / 1000;
    
    console.log(normalizedPassword, salt, n, r, p, key.length, base64js.fromByteArray(key), durationMilli + 'ms', memoryUsed + ' MB');
}

main();
