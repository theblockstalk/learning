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
import Scatter from './scatter.js';
import Contract from './contract.js';

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
            const scatter = new Scatter("Todolist");
            await scatter.connect();
            await scatter.login();

            const todoContract = new Contract("new3", scatter);

            const trx = await todoContract.transact("createitem", {
                from: scatter.account.name,
                item: "apples and oranges"
            })

            console.log(trx);

        } catch (e) {
            this.errorMsg = e.message;
        }
    }
}
</script>

<style scoped>

</style>