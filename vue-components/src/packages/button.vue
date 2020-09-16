<template>
  <button class="s-button" :class="btnClass" :disabled="loading" @click="$emit('click', $event)">
    <s-icon :icon="icon" v-if="icon && !loading" class="icon"></s-icon>
    <s-icon icon="icon-data" v-if="loading" class="icon"></s-icon>
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>

<script>
import { log } from 'util';

export default {
  name: 's-button',
  props: {
    type: {
      type: String,
      default: '',
      validator(type) {
        if (type && !['primary', 'warning', 'danger', 'success', 'info'].includes(type)) {
          console.error('type must be ...')
        }
        return true;
      }
    },
    icon: {
      type: String
    },
    iconPosition: {
      type: String,
      default: 'left',
      validator(data) {
        const arr = ['left', 'right'];
        if (data && arr.indexOf(data) === -1) {
          console.error('iconPosition must be ...')
        }
        return true
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    btnClass() {
      const classes = [];
      if (this.type) {
        classes.push(`s-button-${this.type}`)
      }
      if (this.iconPosition) {
        classes.push(`icon-${this.iconPosition}`)
      }
      return classes;
    }
  }
}
</script>

<style lang="scss">
@import '../styles/_var.scss';
$height: 42px;
$font-size: 16px;
$color: #606266;
$border-color: #dcdfe6;
$background: #ecf5ff;
$active-color: #3a8ee6;

.s-button{
  border-radius: $border-radius;
  border: 1px solid $border-color;
  color: $color;
  background: $background;
  height: $height;
  cursor: pointer;
  font-size: $font-size;
  line-height: 1;
  padding: 12px 20px;
  display: inline-flex;
  justify-content: center;
  vertical-align: middle;
  &:hover{
    border-color: $border-color;
    background-color: $background;
  }
  &:focus, &:active {
    color: $active-color;
    border-color: $active-color;
    background-color: $background;
    outline: none;
  }
  // 设置icon大小
  .icon{
    width: 15px;
    height: 15px;
  }
  .icon + span {
    margin-left: 5px;
  }
  // 设置icon位置
  &.icon-left{
    .icon{
      order: 1;
      margin-right: 5px;
    }
    span{
      order: 2;
    }
  }
  &.icon-right{
    .icon{
      order: 2;
      margin-left: 5px;
    }
    span{
      order: 1;
    }
  }
  // 定义颜色maps
  $color-list: (
    primary: $primary,
    success: $success,
    info: $info,
    warning: $warning,
    danger: $danger
  );
  // 遍历颜色maps
  @each $cK, $cV in $color-list {
    &-#{$cK} {
      background: #{$cV};
      border: 1px solid #{$cV};
      color: #fff;
    }
  }
  @each $type, $color in (primary: $primary-hover, success: $success-hover, info: $info-hover, warning: $warning-hover, danger: $danger-hover) {
    &-#{$type}:hover {
      background: #{$color};
      border: 1px solid #{$color};
      color: #fff;
    }
  }
  @each $type, $color in (primary: $primary-active, success: $success-active, info: $info-active, warning: $warning-active, danger: $danger-active) {
    &-#{$type}:active,  &-#{$type}:focus{
      background: #{$color};
      border: 1px solid #{$color};
      color: #fff;
    }
  }
}
</style>