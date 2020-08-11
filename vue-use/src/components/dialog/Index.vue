<template>
  <div v-if="isShow">
    <h3>{{title}}</h3>
    <p>{{message}}</p>
  </div>
</template>

<script>

export default {
  props: {
    title: String,
    message: String,
    duration: Number
  },
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    show() {
      this.isShow = true,
      setTimeout(() => {
        this.hide();
      }, this.duration)
    },
    hide() {
      this.isShow = false;
      this.remove();
    }
  }
}
</script>
<style>
</style>
/* 
弹窗类组件特点：通常独立于当前vue实例之外，常挂载于body;它们是通过JS动态创建的,不需在任何组件中声明
 */