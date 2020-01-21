<template>
  <div class="hello">
    <h1>{{ projectName }}</h1>
    <b-navbar type="dark" variant="dark">
      <b-nav-item href="#">Link</b-nav-item>
      
      <b-nav-item-dropdown text="User" right>
        <b-dropdown-item href="#">Account</b-dropdown-item>
        <b-dropdown-item href="#">Settings</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar>
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
/* h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
} */
</style>
