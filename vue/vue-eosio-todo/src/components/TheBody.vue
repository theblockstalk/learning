<template>
  <div>
      <p>Account name: {{accountName}}</p>
      <TodoList />
  </div>
</template>

<script>
import TodoList from './TodoList.vue'

export default {
    name: "TheBody",
    props: {
        accountName: String
    },
    data() {
        return {
            // todoItems: []
        }
    },
    components: {
        TodoList
    }
}
</script>

<style scoped>

</style>