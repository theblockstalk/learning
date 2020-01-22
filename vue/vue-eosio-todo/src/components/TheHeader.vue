<template>
  <div class="hello">
    <h1>{{ projectName }}</h1>
  </div>
</template>

<script>
export default {
  name: 'TheHeader',
  props: {
    'projectName': String
  }
}
</script>

<style scoped>
</style>
