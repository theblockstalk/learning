import { Api, JsonRpc, RpcError } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';

class Eosio {
    constructor(account, pkey) {
        this.accountName = account;
        const signatureProvider = new JsSignatureProvider([pkey]);
        
        const rpc = new JsonRpc('https://eos-studio.api.dfuse.dev');
        this.rpc = rpc;

        this.api = new Api({ rpc, signatureProvider });
    }

    async initializeEosio() {
        // TODO: check account matches public key and chain id
        // determine account permission
        // const info = await this.rpc.get_info();
        // const accountRes = await this.rpc.get_account(this.accountName);
        // accountRes.permissions.forEach((permission) => {
        //     permission.required_auth.keys.forEach((key) => {
        //         console.log(key.key)
        //     })
        // })
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
    
    async transact(receiver, action, data) {
        try {
            return await this.api.transact({
                actions: [{
                    account: receiver,
                    name: action,
                    authorization: [{
                        actor: this.accountName,
                        permission: "active",
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