class Scatter {
    contractAccount;
    scatter;

    constructor(contractAccount, scatter) {
        this.contractAccount = contractAccount;
        this.scatter = scatter;
    }

    async transact(action, data) {
        const account = this.scatter.account;
        
        return await this.scatter.eos.transact({
            actions: [{
                account: this.contractAccount,
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
}

export default Scatter