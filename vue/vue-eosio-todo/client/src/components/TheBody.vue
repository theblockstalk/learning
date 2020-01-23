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
    data() {
        return {
            accountName: "jacko"
        }
    },
    components: {
        TodoList
    }
}
</script>

<style scoped>

</style>