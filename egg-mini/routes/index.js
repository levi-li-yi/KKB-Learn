// module.exports = {
//   'get /': async ctx => {
//     ctx.body = '首页'
//   },
//   'get /info': ctx => {
//     ctx.body = '详情页面'
//   }
// }
module.exports = app => ({
  'get /': app.$ctrl.home.index,
  'get /info': app.$ctrl.home.info
})