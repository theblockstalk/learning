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

    async initializeEosio(
        let accountRes;
        try {
            console.log(this.rpc.get_account)
            accountRes = await this.rpc.get_account(this.accountName);
            // accountRes = await this.rpc.get_account({account_name: this.accountName});
            this.rpc.get_account(this.accountName).then((res) 
    );

        } catch (e) {
            console.error(e)
        }
        console.log(accountRes);
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