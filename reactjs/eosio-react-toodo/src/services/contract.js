import eosio from './eosio';

class contract {
    /* 
     * @param contractAccount - the name of the account on the network where the smart contract lives
     * @param eosio - eosio object
     */
    constructor(contractAccount) {
        this.contractAccount = contractAccount;
    }

        /* Initializes the contract to have useful action and table access functions
     *
     * The initialised object will have one function for each of the
     * - actions on the smart contract. These functions take the same arguments in the same order as that they are defined in the smart contract and return a tx receipt.
     * - tables in the smart contract. These functions take one argument each, the scope of the table to search within and return the data from the table.
     */
    async initializeContract() {
        const contract = await this.scatter.eos.getContract(this.contractAccount);
        const abi = await this.scatter.eos.getAbi(this.contractAccount);
        
        let contractAccount = this.contractAccount;
        let scatter = this.scatter;
        let c = this;

        // Create actions calls
        for (let action of contract.actions) {
            const name = action[0];
            const fields = action[1].fields;
            
            c[name] = async function(...args) {
                let len = args.length;
                if (len !== fields.length) throw new Error("Number of arguments does not match action");
                
                const data = {};
                for (let i = 0; i < len; i++) {
                    data[fields[i].name] = args[i]
                }

                return await transact(contractAccount, name, data, scatter);
            }
        }

        // Create table getters
        for (let table of abi.tables) {
            const name = table.name;
            c[name] = async function(scope) {
                return await getTable(contractAccount, scope, name, scatter);
            }
        }
    }
}

async function getTable(code, scope, table, scatter) {
    return await scatter.rpc.get_table_rows({
        json: true,
        code: code,
        scope: scope,
        table: table,
        limit: 10,
        reverse: false,
        show_payer: false
    });
}

async function transact(receiver, action, data, scatter) {
    const account = scatter.account;
    
    return await scatter.eos.transact({
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
}

export default contract;