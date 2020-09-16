<template>
  <div id="app">
    <s-button type="danger" icon="icon-integral-fill" iconPosition="right">Btn</s-button>
    <s-icon icon="icon-copy"></s-icon>
    <s-button-group>
      <s-button>默认</s-button>
      <s-button type="primary">确认</s-button>
      <s-button type="warning">警告</s-button>
    </s-button-group>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
