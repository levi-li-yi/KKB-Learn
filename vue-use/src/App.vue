<template>
  <div id="app">
    <app-main></app-main>
  </div>
</template>

<script>
import AppMain from './components/AppMain';

export default {
  name: 'App',
  components: {
    AppMain
  }
}
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
