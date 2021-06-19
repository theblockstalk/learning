const scrypt = require('scrypt-js');
const bcrypt = require('bcryptjs');
const argon2 = require('argon2-browser');
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
    let keyScrypt = await scrypt.scrypt(bufferPassword, Buffer.from(salt), n, r, p, keyLengthBytes);
    let saltBcrypt = await bcrypt.genSalt(10);
    let keyBcrypt = await bcrypt.hash(normalizedPassword, saltBcrypt);
    const argon2MemoryKb = 1024;
    let keyArgon2 = await argon2.hash({
        pass: normalizedPassword,
        salt,
        // optional
        time: 1, // the number of iterations
        mem: argon2MemoryKb, // used memory, in KiB
        hashLen: 32, // desired hash length
        parallelism: 1, // desired parallelism (it won't be computed in parallel, however)
        type: argon2.ArgonType.Argon2id, // Argon2d, Argon2i, Argon2id
    })
    
    let startTime = new Date();
    keyScrypt = await scrypt.scrypt(bufferPassword, Buffer.from(salt), n, r, p, keyLengthBytes);
    let endTime = new Date();
    let durationMilli = endTime.getTime() - startTime.getTime();
    let memoryUsed = 128 * n * r * p / 1000;
    
    console.log(keyScrypt.length, base64js.fromByteArray(keyScrypt), durationMilli + 'ms', memoryUsed + ' MB');

    startTime = new Date();
    keyBcrypt = await bcrypt.hash(normalizedPassword, saltBcrypt);
    endTime = new Date();
    durationMilli = endTime.getTime() - startTime.getTime();
    
    console.log(keyBcrypt.length, keyBcrypt, durationMilli + 'ms');

    startTime = new Date();
    keyArgon2 = await argon2.hash({
        pass: normalizedPassword,
        salt,
        // optional
        time: 40, // the number of iterations
        mem: argon2MemoryKb, // used memory, in KiB
        hashLen: 32, // desired hash length
        parallelism: 1, // desired parallelism (it won't be computed in parallel, however)
        type: argon2.ArgonType.Argon2id, // Argon2d, Argon2i, Argon2id
    })
    endTime = new Date();
    durationMilli = endTime.getTime() - startTime.getTime();
    
    console.log(keyArgon2.hash.length, keyArgon2.hashHex, durationMilli + 'ms', argon2MemoryKb / 1000 + ' MB');
}

main();
