class Contract {
    contractAccount;
    scatter;

    constructor(contractAccount, scatter) {
        this.contractAccount = contractAccount;
        this.scatter = scatter;
    }

    async initializeContract() {
        const contract = await this.scatter.eos.getContract(this.contractAccount);
        const abi = await this.scatter.eos.getAbi(this.contractAccount);
        
        let contractAccount = this.contractAccount;
        let scatter = this.scatter;
        let c = this;

        // Create actions calles
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

export default Contract