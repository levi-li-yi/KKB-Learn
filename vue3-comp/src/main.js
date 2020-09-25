import { createApp } from 'vue'
import App from './App1.vue'
import './index.css'

createApp(App).mount('#app')

// 核心：响应式+虚拟DOM+模板编译+组件化

// vite特点：按需加载，现代浏览器支持es6, 当使用import XX from './X'时会发起http请求， 此时拦截该请求，去做vue相关的编译、解析等，实现按需加载效果、
// 使用vite开发不需要打包

// import test from '../test.js';

// test();