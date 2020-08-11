let Vue;

function install (_Vue) {
  Vue = _Vue;
  Vue.mixin({
    beforeCreate() {
      // 根组件中挂载$store到全局
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store;
      }
    }
  })
}

class Store {
  constructor(options = {}) {
    // 初始化state, 用vue作响应
    this.state = new Vue({
      data: options.state
    })
    // 初始化mutations
    this.mutations = options.mutations || {};
    // 初始化actions
    this.actions = options.actions || {};

    options.getters && this.handleGetters(options.getters);
  }

  // 实现commit,用来提交mutations
  commit = (type, arg) => {
    const fn = this.mutations[type];
    fn(this.state, arg);
  }
  // 实现dispatch
  dispatch(type, arg) {
    const fn = this.actions[type];
    fn({commit: this.commit, state: this.state}, arg)
  }
  handleGetters(getters) {
    
    this.getters = {};
    // 定义只读性
    Object.keys(getters).forEach(key => {
      Object.defineProperty(this.getters, key, {
        get: () => {
          return getters[key](this.state)
        }
      })
    })
  }
}

export default {Store, install}