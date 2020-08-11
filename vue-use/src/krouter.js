// import Vue from 'vue';
let Vue;

class VueRouter {
  constructor(options) {
    this.$options = options;

    this.routeMap = {};

    this.app = new Vue({
      data: {
        current: '/'
      }
    })
  }
  // init
  init() {
    // 绑定浏览器事件,监听hashchang/load，事件触发当前path的值
    this.bindEvent();
    // 解析路由配置
    this.createRouteMap(this.$options);
    // 初始化创建router-link、router-view
    this.initComponent();
  }
  bindEvent() {
    // 监听window的"hashchange"、"load"事件，并做hash变化后的回调处理(this指向router)
    window.addEventListener('hashchange', this.onHashChange.bind(this));
    window.addEventListener('load', this.onHashChange.bind(this));
  }
  onHashChange() {
    this.app.current = window.location.hash.slice(1) || '/';
  }
  createRouteMap(options) {
    options.routes.forEach(item => {
      // {'/home': {path:'/home', component: Home}}
      this.routeMap[item.path] = item;
    })
  }
  initComponent() {
    // 声明全局组件
    Vue.component('router-link', {
      props: {
        to: String
      },
      render(h) {
        return h('a', {attrs: {href: '#' + this.to}}, this.$slots.default)
        // return <a href={this.to}>{this.$slots.default}</a>
      }
    })
    Vue.component('router-view', {
      // 使用箭头函数，this指向router实例
      render: (h) => {
        const comp = this.routeMap[this.app.current].component;
        return h(comp);
      }
    })
  }
}

VueRouter.install = (_Vue) => {
  Vue = _Vue;
  // vue扩展
  Vue.mixin({
    beforeCreate() {
      // 只在根组件当中执行一次
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router;
        this.$options.router.init();
      }
    }
  })
}

export default VueRouter;