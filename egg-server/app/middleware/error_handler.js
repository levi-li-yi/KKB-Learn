module.exports = (option, app) => {
  return async function (ctx, next) {
    try {
      await next();
    } catch(err) {
      // app 异常触发error事件: 统一的错误应答
      app.emit('error', err, this);
      const status = err.status || 500;
      // 判断运行环境
      const error = status === 500  && app.config.env === 'prod' ? 'Inernal Server Error' : err.message
      ctx.body = {
        code: status,
        error: error
      }
      if (status === 422) {
        ctx.body.detail = err.errors
      }
      ctx.status = 200;
    }
  }
}