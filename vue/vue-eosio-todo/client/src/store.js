import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
      userName: null,
      todoItems: [],
      todoContract: null,
      contractAccount: "new3",
    },
    mutations: {
      SET_ACCOUNT_NAME(state, name) {
        state.userName = name;
      },
      SET_ERROR_MSG (state, msg) {
        state.errorMsg = msg;
      },
      SET_TODO_ITEMS(state, todoItems) {
        state.todoItems = todoItems;
      },
      SET_TODO_CONTRACT(state, todoContract) {
        state.todoContract = todoContract;
      }
    },
    actions: {
      login(context, payload) {
        context.commit('SET_ACCOUNT_NAME', payload.name);
        context.commit('SET_TODO_CONTRACT', payload.contract);
      },
      addItem(context, item) {
        context.commit('ADD_NEW_ITEM', item);
      },
      toggleItem(context, itemId) {
        let todoItems = context.state.todoItems;
        let index = todoItems.findIndex(item => {
          return itemId === item.id
        })
        todoItems[index].done = !todoItems[index].done;
        context.commit('SET_TODO_ITEMS', todoItems);
      },
      async refreshItems(context) {
        const todolist = await context.state.todoContract.todo(context.state.userName);
        let todoItems = [];
        for (let row of todolist.rows) {
            todoItems.push({
                id: row.id,
                name: row.todo,
                done: row.completed === 0 ? false : true
            })
        }
        context.commit('SET_TODO_ITEMS', todoItems);
      }
    }
  })