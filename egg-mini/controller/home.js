module.exports = app =>({
  index: async ctx => {
    // const name = await app.$service.home.getName();
    // app.ctx.body = '首页' + name
    app.ctx.body = await app.$model.home.findAll();
  },
  info: ctx => {
    ctx.body = '详情'
  }
})