const {ref, effect} = require('@vue/reactivity');

// reactivity是独立的包，可以放在任何地方
let count = ref(1);

effect(() => {
  console.log('副作用：', count.value);
})

setInterval(() => {
  count.value++
}, 1500)