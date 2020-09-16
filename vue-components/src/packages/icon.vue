<template>
  <svg class="s-icon" aria-hidden="true">
    <use :xlink:href="`#${icon}`"></use>
  </svg>
</template>

<script>
import icon from '@/styles/icon';

export default {
  name: 's-icon',
  props: {
    icon: {
      type: String,
      require: true
    }
  },
}
</script>

<style lang="scss">
  .s-icon{
    width: 30px;
    height: 30px;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>