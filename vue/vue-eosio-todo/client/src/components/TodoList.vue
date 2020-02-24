<template>
    <div>
        <b-row>
            <b-col>
                <!-- 
                    A form where user can add a new todo item
                 -->
                <form>
                    <div class="form-group">
                        <label>New todo item:</label>
                        <!-- 
                            v-model = two way data binding
                            v-for = render a list of objects
                            @ (shorthand for v-on) = bind an event 
                            : (shorthand for v-bind) = one way bind data to read object
                         -->
                        <input type="text" class="form-control" v-model="newItem" placeholder="Apples">
                    </div>
                    <button type="button" class="btn btn-primary" @click="addItem()">Add</button>
                </form>
            </b-col>
            <b-col>
                <!-- 
                    A list of todo items from the users account
                    Click the item to toggle done/not done
                 -->
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
    // https://www.vuemastery.com/pdf/Vue-Essentials-Cheat-Sheet.pdf
    
    // name of component
    name: "TodoList",

    // data properties accessible in html with e.g. "property"
    data() {
        return {
            errorMsg: null,
            newItem: "",
        }
    },

    // computed data properties accessible in html
    computed: {
        todoItems() {
            return this.$store.state.todoItems
        }
    },

    // child components of this component
    components: {
        TodoListItem
    },

    // methods available to call in html
    methods: {
        async addItem() {
            try {
                // Get the contract from Vuex
                const todoContract = this.$store.state.todoContract;

                /* Call "createitem" action on the contract
                 *
                 * Data flow:
                 * 1. Contact object (see contract.js)
                 * 2. Scatter-js https://github.com/GetScatter/scatter-js
                 * 3. This uses eosjs to package/serialize data and send it to a supported wallet https://developers.eos.io/manuals/eosjs/latest/index
                 * 4. A supported wallet signs the data with imported private keys and sends it to the specified blockchain node https://get-scatter.com/
                 * 5. The eosio node recieves the data with it's http API https://developers.eos.io/manuals/eos/latest/nodeos/plugins/chain_api_plugin/api-reference/index
                 * 6. The http plugin deserizlizes the data and adds it to the P2P software which synchronizes the action to the blockchain https://developers.eos.io/welcome/latest/protocol/index
                 * 
                 * See todolist.hpp for action definition and todolist.cpp for implementation
                 */
                let trx = await todoContract.createitem(this.$store.state.userName, this.newItem);
                if (trx.processed && trx.processed.receipt.status === "executed") {
                    await this.$store.dispatch('refreshItems');
                } else {
                    console.error(trx);
                    throw new Error("Transaction did not execute sucessfull. id: ", trx.transaction_id);
                }
            } catch (e) {
                this.errorMsg = e.message;
            }
            this.newItem = "";
        },
        async toggleItem(id) {
            try {
                const todoContract = this.$store.state.todoContract;

                /* Call "toggledone" action on the contract
                 *
                 * See todolist.hpp for action definition and todolist.cpp for implementation
                 */
                let trx = await todoContract.toggledone(this.$store.state.userName, id);
                if (trx.processed && trx.processed.receipt.status === "executed") {
                    await this.$store.dispatch('toggleItem', id)
                } else {
                    console.error(trx);
                    throw new Error("Transaction did not execute sucessfull. id: ", trx.transaction_id);
                }
            } catch (e) {
                this.errorMsg = e.message;
            }
        }
    }
}
</script>

<style scoped>

</style>