const rpcURL = 'https://ropsten.infura.io/v3/06b7a88ed2144252b61cd24ce8b295dd'
const web3 = new Web3(rpcURL)

const abi = [{"constant":false,"inputs":[{"name":"newMessage","type":"string"}],"name":"update","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"message","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"initMessage","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]
const address = '0xDB40DFF8a009a29Fa8e263a011405122c0E7b468'

const contract = new web3.eth.Contract(abi, address)

function getMessage() {
    contract.methods.message().call((err, result) => {
        alert(result);
    })
}