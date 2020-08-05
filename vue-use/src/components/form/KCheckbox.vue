<template>
  <div>
    <input type="checkbox" :checked="checked" @change="onChange">
  </div>
</template>

<script>

export default {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
  methods: {
    onChange(e) {
      this.$emit('change', e.target.checked)
    }
  }
}
</script>
<style>
</style>