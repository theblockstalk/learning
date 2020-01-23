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
    connected = false;
    account = null;
    eos = null;
    name = "My-app"; // no spaces allowed

    constructor(name = "My-app") {
        this.name = name;
    }

    async connect() {
        this.connected = await ScatterJS.scatter.connect(this.name, {network});
        
        if(!this.connected) throw new Error("Not connected to scatter");
    }

    async login() {
        await ScatterJS.login();

        this.account = ScatterJS.account('eos');

        const rpc = new JsonRpc(network.fullhost());
        this.eos = ScatterJS.eos(network, Api, {rpc});
    }

    async logout() {
        await ScatterJS.logout();
    }
}

export default Scatter