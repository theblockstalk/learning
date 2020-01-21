<template>
  <div>
      This is the body
      Account name: {{accountName}}
  </div>
</template>

<script>
export default {
    props: {
        accountName: String
    },
    data() {
        return {
            todoItems: []
        }
    }
}
</script>

<style scoped>

</style>