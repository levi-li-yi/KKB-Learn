// 创建指定的组件实例,并挂在于独立的body上
import Vue from 'vue';

export default function create(component, props) {
  // 初始化一个vue实例, 并得到vm组件实例
  const vm = new Vue({
    // render提供h函数，用于渲染VNode
    render(h) {
      return h(component, {props})
    }
  }).$mount();

  // 通过$children获取该组件实例
  const comp = vm.$children[0];
  console.log(vm);
  
  // 将组件的dom挂载到body上, 
  document.body.appendChild(vm.$el);

  // 提供清理方法
  comp.remove = () => {
    document.body.removeChild(vm.$el);
    vm.$destroy();
  }
  // 返回组件实例
  return comp;
}