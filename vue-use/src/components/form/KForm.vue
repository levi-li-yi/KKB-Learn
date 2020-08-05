<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>

export default {
  provide() {
    return {
      form: this, // 传递form实例到后代
    }
  },
  props: {
    model: {
      type: Object,
      required: true,
    },
    rules: {
      type: Object
    }
  },
  methods: {
    valiate(cb) {
      // map返回若干个Promise数组
      const task = this.$children
      .filter((item) => item.prop)
      .map((item) => item.validate());
      Promise.all(task)
      .then(() => cb(true))
      .catch(() => cb(false));
    }
  }
}
</script>
<style>
</style>