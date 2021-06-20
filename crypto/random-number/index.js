const crypto = require('crypto');
const base64js = require('base64-js');
const prompt = require('prompt-sync')();

async function main() {
    let entropy = '';
    for (let i = 0; i < 5; i++) {
        const text = prompt(`Please enter text (${i+1}/5):`);
        const time = new Date();
        entropy += text + time.toISOString() + ' | ';
    }

    console.log('entropy', entropy);

    // const browserRandom = window.crypto.getRandomValues();
    const nodeRandom = crypto.randomBytes(32);
    console.log(nodeRandom.length, base64js.fromByteArray(nodeRandom));
}

main();