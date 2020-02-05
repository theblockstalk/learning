<template>
  <div id="app">
    <TheHeader projectName="Todo list"/>
    <TheBody/>
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
</style>
