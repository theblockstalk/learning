// https://www.vuemastery.com/pdf/Vue-Essentials-Cheat-Sheet.pdf

// html
<template>
  <b-container>
      <p>Logged in as: {{userName}}</p>
      <TodoList />
  </b-container>
</template>

// javascript
<script>
import TodoList from './TodoList.vue'
import Scatter from '../services/scatter.js';
import Contract from '../services/contract.js';

export default {
    name: "TheBody",
    computed: {
        userName() {
            // this.$store access to Vuex - the centralized database of Vue (same as Redux for React)
            return this.$store.state.userName;
        }
    },
    components: {
        TodoList
    },
    async created() {
        try {
            // Sets up connection to Scatter
            const scatter = new Scatter("Todolist");
            await scatter.connect();

            // This creates a prompt in Scatter and the user selects an account on the network (if they have one) to use for the app
            await scatter.login();

            // This creates a contract object for our contract
            const todoContract = new Contract(this.$store.state.contractAccount, scatter);
            await todoContract.initializeContract();

            console.log(todoContract);
            /* Object properties:
             * 
             * clear: executes "clear" action on contract
             * contractAccount: name of contract account
             * createitem(from, item): executes "createitem" action on contract
             * scatter: Object
             * scopes(scope): returns data from "scopes" table on contract
             * todo(scope): returns data from "todo" table on contract
             * toggledone(from, id): executes "toggledone" action on contract
             */

            // Commits an "action" to Vuex - same as "actions" in Redux
            // This will modify Vuex through "mutations" - same as "reducers" in Redux
            // Add user name and contract to Vuex
            await this.$store.dispatch('login', {
                name: scatter.account.name, // account user is logged in with
                contract: todoContract
            })

            // Refresh todo items for user to Vuex from blockchain
            await this.$store.dispatch('refreshItems');
        } catch (e) {
            console.error(e);
        }
    }
}
</script>

// css
<style scoped>

</style>