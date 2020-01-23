import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs2';
import eosjs from 'eosjs';

ScatterJS.plugins( new ScatterEOS() );

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
let connected, scatter, account, eos;

export default {
    connect: async function() {
        console.log("connecting to scatter");

        connected = await ScatterJS.scatter.connect('My-App');
        
        if(!connected) throw new Error("Not connected to scatter");
        console.log("connected");

        scatter = ScatterJS.scatter;

        window.ScatterJS = null;

        await scatter.getIdentity(requiredFields);

        // // Always use the accounts you got back from Scatter. Never hardcode them even if you are prompting
        // // the user for their account name beforehand. They could still give you a different account.
        account = scatter.identity.accounts.find(x => x.blockchain === 'eos');

        // // You can pass in any additional options you want into the eosjs reference.
        const eosOptions = { expireInSeconds:60 };

        // // Get a proxy reference to eosjs which you can use to sign transactions with a user's Scatter.
        eos = await scatter.eos(network, eosjs, eosOptions);

        // // Never assume the account's permission/authority. Always take it from the returned account.
        // const transactionOptions = { authorization:[`${account.name}@${account.authority}`] };

        // const trx = await eos.transfer(account.name, 'helloworld', '1.0000 EOS', 'memo', transactionOptions);
    }
}