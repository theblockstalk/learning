import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs2';
import eosjs from 'eosjs';

// Don't forget to tell ScatterJS which plugins you are using.
ScatterJS.plugins( new ScatterEOS() );

const network = {
    blockchain: 'eos',
    protocol: 'https',
    host: 'eos-studio.api.dfuse.dev',
    port: 443,
    chainId: 'bc31c358a5aaafb5f7ad73a2ef85625f67fe9dc027f8c441fc272027d53f00f6'
}


const requiredFields = { accounts:[network] };

export default {
    connect: async function() {
        console.log("connecting to scatter");

        const connected = await ScatterJS.scatter.connect('My-App');
        
        if(!connected) return console.error("not connected");
        console.log("connected");

        const scatter = ScatterJS.scatter;

        window.ScatterJS = null;

        await scatter.getIdentity(requiredFields);

        // Always use the accounts you got back from Scatter. Never hardcode them even if you are prompting
        // the user for their account name beforehand. They could still give you a different account.
        const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');

        // You can pass in any additional options you want into the eosjs reference.
        const eosOptions = { expireInSeconds:60 };

        // Get a proxy reference to eosjs which you can use to sign transactions with a user's Scatter.
        const eos = scatter.eos(network, eosjs, eosOptions);
    }
}