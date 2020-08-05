<template>
  <div>
    <!-- $attrs:继承props以外的部分 -->
    <input :value="value" @input="onInput" v-bind="$attrs">
  </div>
</template>

<script>

export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value);
      this.$parent.$emit('validate');
    },
  }
}
</script>
<style>
</style>