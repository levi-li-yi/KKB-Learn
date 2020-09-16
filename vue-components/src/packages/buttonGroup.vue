<template>
  <div class="button-group">
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 's-button-group',
  mounted() {
    const children = this.$el.children;
    for (let i = 0; i< children.length; i++) {
      consloe.assert(children[i].tagName === 'BUTTON', 'must be');
    }
  }
}

</script>
<style lang="scss">
@import './../styles/_var.scss';
.button-group{
  display: inline-flex;
  vertical-align: middle;
  .s-button{
    position: relative;
    border-radius: 0;
    &:first-child {
      border-radius: $border-radius 0 0 $border-radius;
    }
    &:last-child{
      border-radius: 0 $border-radius $border-radius 0;
    }
    &:not(:first-child){
      margin-left: -1px;
    }
    &:hover{
      z-index: 1;
    }
    &:focus{
      z-index: 1;
    }
  }
}
</style>