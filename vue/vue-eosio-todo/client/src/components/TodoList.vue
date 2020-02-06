<template>
    <div>
        <b-row>
            <b-col>
                <form>
                    <div class="form-group">
                        <label>New todo item:</label>
                        <input type="text" class="form-control" v-model="newItem" placeholder="Apples">
                    </div>
                    <button type="button" class="btn btn-primary" @click="addItem()">Add</button>
                </form>
            </b-col>
            <b-col>
                <p v-if="todoItems.length > 0">List</p>
                <ul class="list-group">
                    <TodoListItem v-for="item in todoItems" @toggle="toggleItem" :name="item.name" :id="item.id" :done="item.done" :key="item.name"/>
                </ul>
            </b-col>
        </b-row>
        <p>{{errorMsg}}</p>
    </div>
</template>

<script>
import TodoListItem from './TodoListItem';

export default {
    name: "TodoList",
    data() {
        return {
            errorMsg: null,
            newItem: "",
        }
    },
    computed: {
        todoItems() {
            return this.$store.state.todoItems
        }
    },
    components: {
        TodoListItem
    },
    methods: {
        async toggleItem(id) {
            try {
                let trx = await this.$store.state.todoContract.toggledone(this.$store.state.userName, id);
                if (trx.processed && trx.processed.receipt.status === "executed") {
                    await this.$store.dispatch('toggleItem', id)
                } else {
                    console.error(trx);
                    throw new Error("Transaction did not execute sucessfull. id: ", trx.transaction_id);
                }
            } catch (e) {
                this.errorMsg = e.message;
            }
        },
        async addItem() {
            try {
                let trx = await this.$store.state.todoContract.createitem(this.$store.state.userName, this.newItem);
                if (trx.processed && trx.processed.receipt.status === "executed") {
                    await this.$store.dispatch('refreshItems');
                } else {
                    console.log(trx);
                    throw new Error("Transaction did not execute sucessfull. id: ", trx.transaction_id);
                }
            } catch (e) {
                this.errorMsg = e.message;
            }
            this.newItem = "";
        },

    }
}
</script>

<style scoped>

</style>