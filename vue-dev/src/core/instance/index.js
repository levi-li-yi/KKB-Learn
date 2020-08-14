import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue) // 实现_init方法
stateMixin(Vue) // 实现$set、$del、$watch
eventsMixin(Vue) // 实现$emit、$on。。。
lifecycleMixin(Vue) // 实现_update、$forceUpdata、$destory
renderMixin(Vue) // 实现$nextTick、_render

export default Vue
