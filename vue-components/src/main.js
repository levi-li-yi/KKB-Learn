import Vue from 'vue'
import App from './App.vue'

import sinuxUI from './packages/index';

Vue.config.productionTip = false;

Vue.use(sinuxUI);

new Vue({
  render: h => h(App),
}).$mount('#app')
