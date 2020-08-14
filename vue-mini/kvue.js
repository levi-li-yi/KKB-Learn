// 
class KVue {
  constructor(options) {

    this.$options = options;

    this.$data = options.data;

    this.observe(this.$data);

    // new Watcher(this, 'fool')
    // this.fool; // 触发依赖收集
    // this.fool; // 触发依赖收集
    new Compile(options.el, this);
  }
  // 观察者
  observe(data) {
    if (!data || typeof data !== 'object') {
      return;
    }
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key]);
      this.proxyData(key);
    })
  }
  // 响应式处理
  defineReactive(data, key, val) {
    // 对象嵌套的递归处理
    this.observe(val);
    // 收集依赖
    const dep = new Dep();
    // 数据拦截
    Object.defineProperty(data, key, {
      get() {
        // 依赖收集(正则替换时，触发get Dep.target === Watcher)
        // dep和Watcher是一对多的关系
        Dep.target && dep.addDep(Dep.target);
        return val;
      },
      set(newVal) {
        if (newVal !== val) {
          val = newVal;
          dep.notify();
        }
      }
    })
  }
  // 代理,将data直接绑定到KVue实例上
  proxyData(key) {
    Object.defineProperty(this, key, {
      get() {
        return this.$data[key];
      },
      set(newVal) {
        this.$data[key] = newVal;
      }
    })
  }
}

// 创建依赖收集
class Dep {
  constructor() {
    this.deps = [];
  }

  // 添加依赖
  addDep(dep) {
    this.deps.push(dep);
  }

  // 接收通知后执行update
  notify() {
    this.deps.forEach(dep => dep.update());
  }
}

// 创建Watcher：保存data数值和组件的挂钩关系
class Watcher {
  // key变化，更新vm
  constructor(vm, key, cb) {
    this.vm = vm;
    this.key = key;
    this.cb = cb;

    // 创建实例时，立刻指向Dep,便于依赖收集
    Dep.target = this;
    // 触发依赖收集
    this.vm[this.key];
    Dep.target = null;
  }

  update() {
    console.log(this.key + '更新了');
    this.cb.call(this.vm, this.vm[this.key]);
  }
}