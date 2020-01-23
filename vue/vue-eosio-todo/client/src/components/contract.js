class Contract {
    contractAccount;
    scatter;

    constructor(contractAccount, scatter) {
        this.contractAccount = contractAccount;
        this.scatter = scatter;
    }

    async init() {
        const contract = await this.scatter.eos.getContract(this.contractAccount);

        let contractAccount = this.contractAccount;
        let scatter = this.scatter;
        let c = this;

        for (let action of contract.actions) {
            const name = action[0];
            const fields = action[1].fields;
            
            c[name] = async function(...args) {
                const data = {};
                for (let i = 0; i < args.length; i++) {
                    data[fields[i].name] = args[i]
                }

                return await transact(contractAccount, name, data, scatter);
            }
        }
    }
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