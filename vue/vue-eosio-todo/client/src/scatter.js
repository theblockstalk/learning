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

class Scatter {
    account = null;
    eos = null;
    name = null;

    constructor(name = "My App") {
        this.name = name;
    }

    async connect() {
        const connected = await ScatterJS.scatter.connect(this.name, {network});
        
        if(!connected) throw new Error("Not connected to scatter");

        await ScatterJS.login();

        this.account = ScatterJS.account('eos');
        console.log(this.account);

        const rpc = new JsonRpc(network.fullhost());
        this.eos = ScatterJS.eos(network, Api, {rpc});

        const trx = await this.eos.transact({
            actions: [{
                account: 'eosio.token',
                name: 'transfer',
                authorization: [{
                actor: this.account.name,
                permission: this.account.authority,
            }],
            data: {
                from: this.account.name,
                to: 'b1',
                quantity: '0.0001 EOS',
                memo: ''
            },
            }]}, {
                blocksBehind: 3,
                expireSeconds: 30,
          })
    }
    
    async logout() {
        await ScatterJS.logout()
    }
}

export default Scatter;