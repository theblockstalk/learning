import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
      userName: null,
      errorMsg: null,
      todoItems: [],
      todoContract: null,
      contractAccount: "new3"
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
      ADD_NEW_ITEM(state, item) {
        state.todoItems.push({
          id: item.id,
          name: item.name,
          done: item.done
        });
      },
      SET_TODO_CONTRACT(state, todoContract) {
        state.todoContract = todoContract;
      }
    },
    actions: {
      login({commit}, payload) {
        commit('SET_ACCOUNT_NAME', payload.name);
        commit('SET_TODO_CONTRACT', payload.contract);
      },
      addItem({commit}, item) {
        commit('ADD_NEW_ITEM', item);
      }
    },
    getters: {
      getDoneItems(state) {
        return state.todoItems.filter( (item) => {
          return item.done;
        });
      }
    }
  })