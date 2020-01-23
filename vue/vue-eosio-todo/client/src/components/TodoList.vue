<template>
  <div>
      <ul>
          <TodoListItem v-for="item in todoItems"
            :name="item.name" :key="item.name"/>
      </ul>
      <p>{{errorMsg}}</p>
  </div>
</template>

<script>
import TodoListItem from './TodoListItem';
import Scatter from '../scatter.js';

export default {
    name: "TodoList",
    props: {
        accountName: String
    },
    data() {
        return {
            errorMsg: null,
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
        try {
            const scatter = new Scatter("Todo list app");
            await scatter.connect();
        } catch (e) {
            this.errorMsg = e.message;
        }
    }
}
</script>

<style scoped>

</style>