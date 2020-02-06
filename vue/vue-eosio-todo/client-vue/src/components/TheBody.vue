<template>
  <div class="container">
      <p>Logged in as: {{userName}}</p>
      <TodoList />
  </div>
</template>

<script>
import TodoList from './TodoList.vue'
import Scatter from '../services/scatter.js';
import Contract from '../services/contract.js';

export default {
    name: "TheBody",
    computed: {
        userName() {
            return this.$store.state.userName;
        }
    },
    components: {
        TodoList
    },
    async created() {
        try {
            const scatter = new Scatter("Todolist");
            await scatter.connect();
            await scatter.login();
            const todoContract = new Contract(this.$store.state.contractAccount, scatter);
            await todoContract.initializeContract();

            await this.$store.dispatch('login', {
                name: scatter.account.name,
                contract: todoContract
            })
            await this.$store.dispatch('refreshItems');
        } catch (e) {
            console.error(e);
        }
    }
}
</script>

<style scoped>

</style>