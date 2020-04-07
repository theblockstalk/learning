import { Api, JsonRpc, RpcError } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
import ecc from 'eosjs-ecc';
import copyObj from './objects';

class Eosio {
    async initializeEosio(account, network) {
        let accountCopy = copyObj(account);
        const signatureProvider = new JsSignatureProvider([accountCopy.pkey]);
        accountCopy.pubkey = ecc.privateToPublic(accountCopy.pkey);

        let rpc = new JsonRpc(network.node);
        const info = await rpc.get_info();
        if (info.chain_id !== network.chainId) throw Error("Chain id is not the same");

        const accountRes = await rpc.get_account(accountCopy.name);
        let isPermissionFound = false;
        accountRes.permissions.forEach((permission) => {
            permission.required_auth.keys.forEach((key) => {
                if (accountCopy.permission === permission.perm_name && key.key === accountCopy.pubkey)
                    isPermissionFound = true;
            })
        })
        if (!isPermissionFound) throw Error("Permission " + accountCopy.permission + " with account " + accountCopy.name + " was not found");

        delete accountCopy.pkey;
        this.account = accountCopy;
        this.network = network;

        let api = new Api({ rpc, signatureProvider });

        this.api = api;
        this.rpc = rpc;
        
        this.getTable = async function(code, scope, table) {
            return await rpc.get_table_rows({
                json: true,
                code: code,
                scope: scope,
                table: table,
                limit: 10,
                reverse: false,
                show_payer: false
            });
        }
        
        this.transact = async function(receiver, action, data) {
            try {
                return await api.transact({
                    actions: [{
                        account: receiver,
                        name: action,
                        authorization: [{
                            actor: account.name,
                            permission: account.permission,
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
}

export default Eosio