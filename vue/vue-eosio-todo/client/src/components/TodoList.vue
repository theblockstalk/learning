<template>
  <div>
      <ul>
          <TodoListItem v-for="item in todoItems"
            :name="item.name" :key="item.name"/>
      </ul>
  </div>
</template>

<script>
import TodoListItem from './TodoListItem';
import eosio from '../eosio.js';

export default {
    name: "TodoList",
    props: {
        accountName: String
    },
    data() {
        return {
            todoItems: [
                {
                    name: "Apples",
                    done: true
                },
                {
                    name: "Pears",
                    done: false
                },
            ]
        }
    },
    components: {
        TodoListItem
    },
    async created() {
        await eosio.connect();
        await eosio.login();
    }
}
</script>

<style scoped>

</style>