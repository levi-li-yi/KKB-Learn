import Button from './button.vue';
import Icon from './icon.vue';
import ButtonGroup from './buttonGroup.vue';

const install = (Vue) => {
  Vue.component(Button.name, Button);
  Vue.component(Icon.name, Icon);
  Vue.component(ButtonGroup.name, ButtonGroup);
}

if(window.Vue !== undefined) {
  console.log('unde');
  install(Vue);
}

export default {
  install
}