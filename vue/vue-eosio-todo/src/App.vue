<template>
  <div id="app">
    <TheHeader projectName="Todo list"/>
    <TheBody accountName="jacko"/>
  </div>
</template>

<script>
import TheHeader from './components/TheHeader.vue'
import TheBody from './components/TheBody.vue'

export default {
  name: 'app',
  components: {
    TheHeader,
    TheBody
  }
}
</script>

<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
