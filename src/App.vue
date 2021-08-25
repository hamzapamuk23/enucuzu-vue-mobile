<template>
  <div id="app">
    <School2 />
  </div>
</template>

<script>
import School2 from "./components/School2.vue";

export default {
  name: "App",
  components: {
    School2,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
