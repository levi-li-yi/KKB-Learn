import {shallowMount} from '@vue/test-utils';

import {expect} from 'chai';

import Button from '@/packages/button.vue';
import Icon from '@/packages/icon.vue';

// 描述测试button组件
describe('button.vue', () => {
  it('1测试slot是否正常', () => {
    const wrapper = shallowMount(Button, {
      slots: {
        default: 'sinux-ui'
      }
    })
    expect(wrapper.text()).to.equal('sinux-ui');
  })
  it('2测试传入icon属性', () => {
    const wrapper = shallowMount(Button, {
      stubs: {
        's-icon': Icon
      },
      propsData: {
        icon: 'edit'
      }
    })
    expect(wrapper.find('use').attributes('href')).to.equal('#icon-edit')
  })
  it('3测试传入loading', () => {
    const wrapper = shallowMount(Button, {
      stubs: {
        's-icon': Icon
      },
      propsData: {
        loading: true
      }
    })
    // expect(wrapper.find('use').attributes('href')).to.equal('#icon-loading');
    expect(wrapper.find('button').attributes('disabled')).to.equal('disabled');
  })
  it('测试点击按钮', () => {
    const wapper = shallowMount(Button, {
      stubs: ['s-icon']
    })
    wapper.find('button').trigger('click');
    expect(wapper.emitted('click').length).to.equal(1);
  })
})