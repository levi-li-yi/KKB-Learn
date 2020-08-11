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
import KInput from "./KInput";
import KCheckbox from "./KCheckbox";
import KFormItem from "./KFormItem";
import KForm from "./KForm";
import Dialog from '../dialog/Index';
import create from '@/utils/create';

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
      const tip = create(Dialog, {
        title: '提示',
        message: '提示内容',
        duration: 5000
      });
      tip.show();
      
      this.$refs.ruleForm.valiate((valid) => {
        if (valid) {
          console.log('login');
        } else {
          console.log('error');
        }
      })
    }
  }
}
</script>

// Form表单组件：
/* 1、Form组件：管理数据模型model；校验规则rules;全局校验方法validate */
/* 2、FormItem显示标签label;执行校验prop;显示校验结果 */
/* 3、Input绑定数据模型v-model；通知FormItem执行校验 */