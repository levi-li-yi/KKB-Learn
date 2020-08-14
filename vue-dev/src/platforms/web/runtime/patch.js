/* @flow */

import * as nodeOps from 'web/runtime/node-ops'
import { createPatchFunction } from 'core/vdom/patch'
import baseModules from 'core/vdom/modules/index'
import platformModules from 'web/runtime/modules/index'

// the directive module should be applied last, after all
// built-in modules have been applied.
// 拓展模块：把通用模块和浏览器特有模块合并
const modules = platformModules.concat(baseModules)

// 工厂函数：创建浏览器特有的patch函数，主要解决跨平台问题
export const patch: Function = createPatchFunction({ nodeOps, modules })
