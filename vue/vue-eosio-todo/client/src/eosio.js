import ScatterJS from 'scatterjs-core';
import ScatterEOSIO from 'scatterjs-plugin-eosjs2';
import eosjs from 'eosjs';

ScatterJS.plugins( new ScatterEOSIO() )

const CONTRACT_ACCOUNT = 'new3';
const APP_NAME = "Todo list app";

const network = {
    blockchain: 'eos',
    protocol: 'https',
    host: 'eos-studio.api.dfuse.dev',
    port: 443,
    chainId: 'bc31c358a5aaafb5f7ad73a2ef85625f67fe9dc027f8c441fc272027d53f00f6'
}

let scatter, account, eos;

const connect = async function() {
    const connected = await ScatterJS.scatter.connect(APP_NAME)

    if(!connected) throw Error("Could not connect to Scatter");

    window.ScatterJS = null;

    scatter = ScatterJS.scatter;
}

const login = async function() {
    const requiredFields = { accounts:[network] };
    await scatter.getIdentity(requiredFields);
    
    // Always use the accounts you got back from Scatter. Never hardcode them even if you are prompting
    // the user for their account name beforehand. They could still give you a different account.
    account = scatter.identity.accounts.find(x => x.blockchain === 'eos');

    // You can pass in any additional options you want into the eosjs reference.
    const eosOptions = { expireInSeconds:60 };

    // Get a proxy reference to eosjs which you can use to sign transactions with a user's Scatter.
    eos = scatter.eos(network, eosjs, eosOptions);
}

const createitem = async function(todoStr) {
    const trx = await transact('createitem', {
        from: account,
        item: todoStr
    })

    return trx.transaction_id;
    // console.log(`Transaction ID: ${trx.transaction_id}`);
}

const transact = async function(action, data) {
    return await eos.transact({
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