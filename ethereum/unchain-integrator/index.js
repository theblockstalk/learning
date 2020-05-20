// New metamask details for temporary Ropsten account. Do not ever put details like this (or private key) in code. 
// password = nUWwWU8QZdecNFH
// phrase = asthma churn upgrade betray loan erosion zone outer rigid much test senior

// require dependencies
const Web3 = require('web3');
const EthTx = require('ethereumjs-tx').Transaction;

// assign address and private key to account
const account = {
    address: '0xCdA2fdfAb7b0db8fb3f53c4233F8f3B4AeAFFE60', // Your address goes here
    privateKey: 'b1503fe93651901e67c44e5247e739afe4371cf28161af2dedda31e918b44d66' // Your private key goes here
};

const rpcURL = 'ropsten-archive.nodes.unchain.io/v0/4dcd7eef-8c6b-4611-9492-7adfc5ab7066'; // Your RPC URL goes here

const username = 'floral-silence-11'; // your BLOCKCHAIN GATEWAY username goes here
const password = 'hdxtfpucngrs6wj5v4rr'; // your BLOCKCHAIN GATEWAY password goes here
let creds = username + ':' + password;
const secURL = 'https://' + creds + '@' +  rpcURL;

const provider = new Web3.providers.HttpProvider(secURL);
const web3 = new Web3(provider);


const transact = async () => {
    const txnCount = await web3.eth.getTransactionCount(account.address);

    const rawTx = {
        nonce: web3.utils.toHex(txnCount),
        gasLimit: web3.utils.toHex(21008),
        gasPrice: web3.utils.toHex(web3.utils.toWei('100', 'gwei')),
        to: account.address,
        value: '0x00'
    };

    // sign and serialize the transaction

    const tx = new EthTx(rawTx, {chain: 'ropsten'});
    const privKey = Buffer.from(account.privateKey, 'hex');
    tx.sign(privKey);

    let serializedTx = tx.serialize();

    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
        .once('transactionHash', console.log)
        .on('receipt', console.log)
        .on('error', err => console.error(err))
        .catch((err) => console.log);
};

transact();

// Output
// https://ropsten.etherscan.io/address/0xcda2fdfab7b0db8fb3f53c4233f8f3b4aeaffe60
/*

0xc71f0f5053a303f6c79d6088b96a400c4eb330c5b148f0f4f3e6919bff1c4e08
{
  blockHash: '0x84d8f70978bf579ce6226757a848a70ec36114bf871bb72d02bd1cc4603834e7',
  blockNumber: 7937006,
  contractAddress: null,
  cumulativeGasUsed: 73082,
  from: '0xcda2fdfab7b0db8fb3f53c4233f8f3b4aeaffe60',
  gasUsed: 21000,
  logs: [],
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  to: '0xcda2fdfab7b0db8fb3f53c4233f8f3b4aeaffe60',
  transactionHash: '0xc71f0f5053a303f6c79d6088b96a400c4eb330c5b148f0f4f3e6919bff1c4e08',
  transactionIndex: 1
}

*/