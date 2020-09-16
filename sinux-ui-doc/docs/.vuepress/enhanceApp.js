// 当前vuepress项目入口
import Vue from 'vue';
import Element from 'element-ui'; // 引入elementUi，因为要用到elementui里的结构
import 'element-ui/lib/theme-chalk/index.css'

import hljs from 'highlight.js' //引入高亮js
import 'highlight.js/styles/googlecode.css' //引入高亮js样式文件

import sinuxUI from 'sinux-ui';
import 'sinux-ui/dist/sinux-ui.css'

Vue.directive('highlight', function(el) {
  const blocks = el.querySelectorAll('pre code');
  blocks.forEach((block) => {
    hljs.highlight(block);
  })
})

export default ({
  Vue,
  options,
  router,
  siteData
}) => {
  Vue.use(Element);
  Vue.use(sinuxUI);
}