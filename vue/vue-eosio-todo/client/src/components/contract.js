class Contract {
    contractAccount;
    scatter;

    constructor(contractAccount, scatter) {
        this.contractAccount = contractAccount;
        this.scatter = scatter;
    }

    async createContract() {
        const contract = await this.scatter.eos.getContract(this.contractAccount);

        let c = {};

        for (let action of contract.actions) {
            const name = action[0];
            const fields = action[1].fields;

            const contractAccount = this.contractAccount;
            const scatter = this.scatter;

            c[name] = async function(...args) {
                console.log("Calling action: " + name)
                const data = {};
                for (let i = 0; i < args.length; i++) {
                    data[fields[i].name] = args[i]
                }

                return await transact(contractAccount, name, data, scatter);
            }
        }

        return c;
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