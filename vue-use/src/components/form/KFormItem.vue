<template>
  <div>
    <label v-if="label">
      {{label}}
    </label>
    <slot></slot>
    <p v-if="errorMessage">{{errorMessage}}</p>
  </div>
</template>

<script>
import Schema from 'async-validator';

export default {
  data() {
    return {
      errorMessage: ''
    }
  },
  inject: ['form'],
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String,
      default: ''
    }
  },
  mounted() {
    this.$on('validate', () => {
      this.validate();
      console.log('password');
      
    })
  },
  methods: {
    validate() {
      const rules = this.form.rules[this.prop];

      const value = this.form.model[this.prop];
      // console.log(rules, value);

      // zhix 校验
      const desc = {
        [this.prop]: rules
      }
      const schema = new Schema(desc);
      // 返回Promise<boolean>
      return schema.validate({[this.prop]: value}, errors => {
        if (errors) {
          this.errorMessage = errors[0].message;
        } else {
          this.errorMessage = '';
        }
      })
    }
  }
}
</script>
<style>
</style>