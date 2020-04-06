import { Api, JsonRpc, RpcError } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';

class Eosio {
    constructor(account, pkey) {
        this.account = account;
        const signatureProvider = new JsSignatureProvider([pkey]);

        const rpc = new JsonRpc('https://eos-studio.api.dfuse.dev:8888');
        this.rpc = rpc;

        this.api = new Api({ rpc, signatureProvider });
    }

    async getTable(code, scope, table) {
        return await this.rpc.get_table_rows({
            json: true,
            code: code,
            scope: scope,
            table: table,
            limit: 10,
            reverse: false,
            show_payer: false
        });
    }
    
    async transact(account, receiver, action, data) {
        try {
            return await this.api.transact({
                actions: [{
                    account: receiver,
                    name: action,
                    authorization: [{
                        actor: account.name,
                        permission: account.authority,
                }],
                data: data,
                }]}, {
                    blocksBehind: 3,
                    expireSeconds: 30,
              }
            )    
        } catch (e) {
            console.log('\nCaught exception: ' + e);
            if (e instanceof RpcError)
              console.error(JSON.stringify(e.json, null, 2));
            else
                throw Error(e);
        }
    }    
}

export default Eosio