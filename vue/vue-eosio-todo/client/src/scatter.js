import ScatterJS from '@scatterjs/core';
import ScatterEOS from '@scatterjs/eosjs2'
import {JsonRpc, Api} from 'eosjs'

ScatterJS.plugins( new ScatterEOS() );

const network = ScatterJS.Network.fromJson({
    blockchain:'eos',
    chainId:'bc31c358a5aaafb5f7ad73a2ef85625f67fe9dc027f8c441fc272027d53f00f6',
    host:'eos-studio.api.dfuse.dev',
    port:443,
    protocol:'https'
});

const requiredFields = { accounts:[network] };
let connected, scatter, account, eos;

export default {
    connect: async function() {
        console.log("connecting to scatter");

        connected = await ScatterJS.scatter.connect('My-App', {network});
        
        if(!connected) throw new Error("Not connected to scatter");
        console.log("connected");

        await ScatterJS.login();

        account = ScatterJS.account('eos')

        const rpc = new JsonRpc(network.fullhost());
        eos = ScatterJS.eos(network, Api, {rpc});

        const trx = await eos.transact({
            actions: [{
                account: 'eosio.token',
                name: 'transfer',
                authorization: [{
                actor: 'dablockstalk',
                permission: 'active',
            }],
            data: {
                from: 'dablockstalk',
                to: 'b1',
                quantity: '0.0001 EOS',
                memo: '',
            },
            }]}, {
                blocksBehind: 3,
                expireSeconds: 30,
          })
    },
    logout: async function() {
        ScatterJS.logout()
    }
}