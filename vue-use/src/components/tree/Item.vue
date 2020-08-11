<template>
  <li>
    <div @click="trigger">
      {{model.title}}
      <span v-if="isFolder">[{{open ? '-' : '+'}}]</span>
    </div>
    <ul v-show="open" v-if="isFolder">
      <item v-for="(model, index) in model.children" :model="model" :key="index">
      </item>
    </ul>
  </li>
</template>

<script>

export default {
  name: 'Item',
  props: {
    model: Object
  },
  data() {
    return {
      open: false
    }
  },
  computed: {
    isFolder() {
      return this.model && this.model.children;
    }
  },
  methods: {
    trigger() {
      if (this.isFolder) {
        this.open = !this.open;
      }
    }
  }
}
</script>
<style>
</style>