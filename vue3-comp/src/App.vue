<template>
<!-- <div>
    <h5>{{count}}</h5>
    <button @click="add">click</button>
  </div> -->
<h1>Fragment:</h1>
<p>{{x}}and{{y}}</p>
<input type="text" v-model="state.val">
<ul>
  <li v-for="(todo, index) in state.todos" :key="index">{{todo.name}}</li>
</ul>
<p>
  {{total}}
</p>
<button @click="addTodo">click</button>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import {
  ref,
  reactive,
  toRef,
  computed
} from 'vue';
// ref用于简单的数据结构
// reactive用于复杂的数据结构

import useMouse from './useMouse';

export default {
  // option api
  // options api每写一个模块都需要写data/method/watcher,一个功能相关的代码被分散，代码较多时在书写时会反复"横跳"，也不容易进行维护

  // data() {
  //   return {
  //     title: '3'
  //   }
  // },
  // components: {
  //   HelloWorld
  // }

  // composition api
  setup() {
    let {
      state,
      total,
      addTodo
    } = useAddTodo();
    let {
      x,
      y
    } = useMouse();
    return {
      state,
      total,
      addTodo,
      x,
      y
    }
    // ref是将一个基础变量(字符串、数字等)变成响应式
    // composition api优势：
    // 什么是composition api：是基于函数组合的API，把跟一个功能相关的代码全部放在一个地方去维护、每一个功能都可以放在一个function当中、这个function可以单独存在也可以单独发布
    // 相比于mixin的优势是数据来源清晰,命名容易冲突
    // 为何要使用
    // 如何使用
    // let count = ref(1);

    // function add() {
    //   count.value++;
    // }
    // return {
    //   count,
    //   add
    // };
  },
}

// 如何组合：把一个功能抽离到一个单独的函数
function useAddTodo() {
  let state = reactive({
    todos: [{
      name: 'first',
      done: false
    }],
    val: ''
  });
  let total = computed(() => state.todos.length);

  function addTodo() {
    state.todos.push({
      name: 'second',
      done: true
    })
  }
  return {
    state,
    total,
    addTodo
  }
  // return {...toRef(state)} 可使用unref展开复杂的数据结构，之后就可以直接调用todos而不需添加state.
}
</script>
