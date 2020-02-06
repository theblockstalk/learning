<template>
  <div class="hello">
    <h1>{{ projectName }}</h1>
    <p>User</p>
    <div>
      <p>Account</p>
      <p>Settings</p>
    </div>
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
