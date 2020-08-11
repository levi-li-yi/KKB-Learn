import Vue from 'vue';
import VueRouter from './krouter';

import Home from './views/Home';
import List from './views/List';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {path: '/', component: Home},
    {path: '/list', component: List},
  ]
})
