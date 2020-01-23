import ScatterJS from '@scatterjs/core';
import ScatterEOS from '@scatterjs/eosjs2'
import {JsonRpc, Api} from 'eosjs'

ScatterJS.plugins( new ScatterEOS() );

// const network = {
//     blockchain: 'eos',
//     protocol: 'https',
//     host: 'eos-studio.api.dfuse.dev',
//     port: 443,
//     chainId: 'bc31c358a5aaafb5f7ad73a2ef85625f67fe9dc027f8c441fc272027d53f00f6'
// }

const network = ScatterJS.Network.fromJson({
    blockchain:'eos',
    chainId:'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
    host:'nodes.get-scatter.com',
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

        const contract = await eos.contract("eosio.token");

        const trx = await contract.transfer({
            from: "dablockstalk",
            to: "b1",
            quantity: "1.0000 EOS",
            memo: ""
        })
    },
    logout: async function() {
        ScatterJS.logout()
    }
}