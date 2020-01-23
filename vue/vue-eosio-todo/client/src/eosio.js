import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs2';
import eosjs from 'eosjs';

ScatterJS.plugins( new ScatterEOS() )

const CONTRACT_ACCOUNT = 'new3';
const APP_NAME = "Todo list app";

// const network = {
//     blockchain: 'eos',
//     protocol: 'https',
//     host: 'eos-studio.api.dfuse.dev',
//     port: 443,
//     chainId: 'bc31c358a5aaafb5f7ad73a2ef85625f67fe9dc027f8c441fc272027d53f00f6'
// }

const network = {
    blockchain: 'eos',
    protocol: 'https',
    host: 'nodes.get-scatter.com',
    port: 443,
    chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
}

const requiredFields = { accounts:[network] };
let scatter, account, eosApi;

ScatterJS.scatter.connect("My app").then(connected => {
    console.log(connected);
});

const connect = async function() {
    console.log("Connecting to scatter");
    const connected = await ScatterJS.scatter.connect(APP_NAME);
    console.log(connect);
    if(!connected) throw Error("Could not connect to Scatter");

    window.ScatterJS = null;

    scatter = ScatterJS.scatter;
}

const login = async function() {
    await scatter.getIdentity(requiredFields);
    
    // Always use the accounts you got back from Scatter. Never hardcode them even if you are prompting
    // the user for their account name beforehand. They could still give you a different account.
    account = scatter.identity.accounts.find(x => x.blockchain === 'eos');

    // You can pass in any additional options you want into the eosjs reference.
    const eosOptions = { expireInSeconds:60 };

    // Get a proxy reference to eosjs which you can use to sign transactions with a user's Scatter.
    eosApi = scatter.eos(network, eosjs, eosOptions);
}

const createitem = async function(todoStr) {
    const contract = await eosApi.getContract(CONTRACT_ACCOUNT, {requiredFields});
    const trx = await contract.createitem({
        from: account,
        item: todoStr
    })
    // const trx = await transact('createitem', {
    //     from: account,
    //     item: todoStr
    // })

    console.log(`Transaction ID: ${trx.transaction_id}`);
}

const transact = async function(action, data) {
    return await eosApi.transact({
        actions: [{
            account: CONTRACT_ACCOUNT,
            name: action,
            authorization: [{
                actor: account.name,
                permission: account.authority,
            }],
            data: data,
        }]
    }, {
        blocksBehind: 3,
        expireSeconds: 30,
    })
}

export default {
    connect: connect,
    login: login,
    actions: {
        createitem: createitem,
        toggledone: null
    }
}