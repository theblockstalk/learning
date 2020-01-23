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
            todoItems: [],
            todoContract: null
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

            this.todoContract = new Contract("new3", scatter);
            await this.todoContract.initializeContract();
            // let trx = await this.todoContract.createitem(scatter.account.name, "apples and oranges");

            const todolist = await this.todoContract.todo(scatter.account.name);
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