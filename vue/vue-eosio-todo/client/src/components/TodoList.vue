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
import connect from '../eosio';

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
    created() {
        connect();
    }
}
</script>

<style scoped>

</style>