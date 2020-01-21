<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <EventCard />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import EventCard from "@/components/EventCard.vue";

export default {
  name: "home",
  components: {
    HelloWorld,
    EventCard
  }
};
</script>
