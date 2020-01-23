<template>
  <div>
      <ul>
          <TodoListItem v-for="item in todoItems"
            :name="item.name" :done="item.done" :key="item.name"/>
      </ul>
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
            todoItems: []
        }
    },
    components: {
        TodoListItem
    },
    async created() {
        try {
            const scatter = new Scatter("Todolist");
            await scatter.connect();
            await scatter.login();

            const todoContract = new Contract("new3", scatter);
            await todoContract.init();
            // let trx = await todoContract.createitem(scatter.account.name, "apples and oranges");

            const todolist = await todoContract.todo(scatter.account.name);
            this.todoItems = [];
            for (let row of todolist.rows) {
                this.todoItems.push({
                    id: row.id,
                    name: row.todo,
                    done: row.completed === 0 ? false : true
                })
            }
            
        } catch (e) {
            this.errorMsg = e.message;
        }
    }
}
</script>

<style scoped>

</style>