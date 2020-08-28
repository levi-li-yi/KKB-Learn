const moment = require('moment');

// 格式化时间
exports.formatTime = time => moment(time).format('YYY-MM-DD hh:mm:ss');

// 请求成功响应
exports.success = ({ ctx, res = null, msg = '请求成功'}) => {
  ctx.body = {
    code: 0,
    data: res,
    msg
  }
  ctx.status = 200;
}