// 用proxy监听一个对象后，数据获取会触发get

// Object.name 收集依赖

// Object.name = XXX 触发set, 执行收集依赖的effect

// vue2中专门有两个class做依赖收集：
// class Dep{}
// class Watcher{}

// vue3将class废弃了，因为class类仍在不停讨论
// 依赖收集使用map
// {
//   target: {
//     key: [effect1, effect2]
//   }
// }

let targetMap = new WeakMap();
let effectStack = []; // 存储effect
function track(target, key) {
  // 初始化
  const effect = effectStack[effectStack.length - 1];
  if (effect) {
    let depMap = targetMap.get(target);
    if (depMap === undefined) {
      depMap = new Map()
      targetMap.set(target, depMap);
    }

    let dep = depMap.get(key);
    if (dep === undefined) {
      dep = new Set(); // Set防止重复
      depMap.set(key, dep);
    }
    // 完成初始化

    // 开始收集
    if(!dep.has(effect)) {
      dep.add(effect); // 收集effect
      effect.deps.push(dep); // 双向缓存
    }
  }
}

//  从targetMap中找出depMap下的effect，然后去执行
function trigger(target, key, info) {
  let depMap = targetMap.get(target);
  if (depMap === undefined) {
    return // 没有effect
  }
  const effects = new Set();
  const computeds = new Set(); // cpmputed是特殊的惰性求值的effect
  if(key) {
    let deps = depMap.get(key);
    deps.forEach((effect) => {
      if (effect.computed) {
        computeds.add(effect);
      } else {
        effects.add(effect);
      }
    })
  }

  // 执行effect
  effects.forEach(effect => effect());
  computeds.forEach(effect => effect());
}

const baseHandler = {
  get(target, key) {
    const ret = target[key]; // 实际中使用Reflect.get()
    // 若ret是对象还可以递归ret
    // TODO 收集依赖
    track(target, key);
    return ret;
  },
  set(target, key, val) {
    const info = {oldValue: target[key], newValue: val}
    target[key] = val; // 实际使用Reflect.set()
    // TOTO 拿到所收集的依赖，执行effect
    trigger(target, key, info); // 执行effect
  }
}

function reactive(target) {
  const observed = new Proxy(target, baseHandler); // 
  return observed;
}

function effect(fn, options = {}) {
  let e = createReactiveEffect(fn, options);
  if (!e.lazy) {
    e();
  }
  return e;
}

function createReactiveEffect(fn, options) {
  const effect = function effect(...args) {
    return run(effect, fn ,args);
  }
  effect.deps = [];
  effect.computed = options.computed;
  effect.lazy = options.lazy;
  return effect;
}

function run(effect, fn ,args) {
  if(effectStack.indexOf(effect) === -1) {
    try{
      effectStack.push(effect);
      return fn(...args);
    }finally{
      effectStack.pop();
    }
  }
}


function computed(fn) {
  const runner = effect(fn, {computed: true, lazy: true});
  return {
    effect: runner,
    get value() {
      return runner();
    }
  }
}
