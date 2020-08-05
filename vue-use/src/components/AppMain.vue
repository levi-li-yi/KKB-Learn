<template>
  <div>
    <k-form :model="model" :rules="rules" ref="ruleForm">
      <k-form-item label="用户名" prop="username">
      <k-input v-model="model.username" />
    </k-form-item>
    <k-form-item label="密码" prop="password">
      <div>
        <k-input v-model="model.password" type="password"/>
      </div>
    </k-form-item>
    <k-form-item label="选择" prop="isSelect">
      <k-checkbox v-model="model.isSelect"></k-checkbox>
    </k-form-item>
    <k-form-item>
      <button @click="login">登录</button>
    </k-form-item>
    </k-form>
  </div>
</template>
<script>
import KInput from "./form/KInput";
import KCheckbox from "./form/KCheckbox";
import KFormItem from "./form/KFormItem";
import KForm from "./form/KForm";


export default {
  components: {
    KInput,
    KFormItem,
    KForm,
    KCheckbox
  },
  data() {
    return {
      model: {
        username: '',
        password: '',
        isSelect: false
      },
      rules: {
        username: [
          {required: true, message: '不能为空', tigger: 'blur'}
        ],
        password: [
          {required: true, message: '不能为空', tigger: 'blur'}
        ],
        isSelect: [
          {required: true, message: '不能为空', tigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    login() {
      this.$refs.ruleForm.valiate((valid) => {
        if (valid) {
          console.log('login');
        } else {
          console.log('error');
        }
      })
    }
  }
};
</script>