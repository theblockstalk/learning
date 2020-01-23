<template>
    <div>
        New todo: <input type="text" v-model="newItem" placeholder="Apples">
        <button @click="addItem()">Add</button>
        <p v-if="todoItems.length > 0">List</p>
        <TodoListItem v-for="item in todoItems" @toggle="toggleItem" :name="item.name" :id="item.id" :done="item.done" :key="item.name"/>
        <p>{{errorMsg}}</p>
    </div>
</template>

<script>
import TodoListItem from './TodoListItem';
import Scatter from './scatter.js';
import Contract from './contract.js';

export default {
    name: "TodoList",
    data() {
        return {
            accountName: null,
            errorMsg: null,
            newItem: "",
            todoItems: [],
            scatter: null,
            todoContract: null
        }
    },
    components: {
        TodoListItem
    },
    methods: {
        async toggleItem(id) {
            try {
                let trx = await this.todoContract.toggledone(this.scatter.account.name, id);
                if (trx.processed && trx.processed.receipt.status === "executed") {
                    let index = this.todoItems.findIndex(item => {
                        return id === item.id
                    })
                    this.todoItems[index].done = !this.todoItems[index].done;
                } else {
                    console.log(trx);
                    throw new Error("Transaction did not execute sucessfull. id: ", trx.transaction_id);
                }
            } catch (e) {
                this.errorMsg = e.message;
            }
        },
        async addItem() {
            try {
                let trx = await this.todoContract.createitem(this.scatter.account.name, this.newItem);
                if (trx.processed && trx.processed.receipt.status === "executed") {
                    await this.refreshList();
                } else {
                    console.log(trx);
                    throw new Error("Transaction did not execute sucessfull. id: ", trx.transaction_id);
                }
            } catch (e) {
                this.errorMsg = e.message;
            }
            this.newItem = "";
        },
        async refreshList() {
            const todolist = await this.todoContract.todo(this.scatter.account.name);
            this.todoItems = [];
            for (let row of todolist.rows) {
                this.todoItems.push({
                    id: row.id,
                    name: row.todo,
                    done: row.completed === 0 ? false : true
                })
            }            

        }

    },
    async created() {
        try {
            this.scatter = new Scatter("Todolist");
            await this.scatter.connect();
            await this.scatter.login();

            this.todoContract = new Contract("new3", this.scatter);
            await this.todoContract.initializeContract();

            await this.refreshList();
        } catch (e) {
            this.errorMsg = e.message;
        }
    }
}
</script>

<style scoped>

</style>