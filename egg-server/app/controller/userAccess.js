const {Controller} = require('egg');

class UserAccessController extends Controller {
  constructor(ctx) {
    super(ctx);
  }
  /**
   * @summary 用户登入
   * @description 用户登入
   * @router post /auth/jwt/login
   * @request body loginRequest *body
   * @response 200 baseResponse 创建成功
   */
  async login() {
    const {ctx, service}  = this;
    // 检验参数
    ctx.validate(ctx.rule.loginRequest);
    // 组装参数
    const payload  = ctx.request.body || {};
    // 调用Service 进行业务处理
    const res = await service.userAccess.login(payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res});
  }

  /**
   * @summary 用户登出
   * @description 用户登出
   * @router post /auth/jwt/logout
   * @request body loginRequest *body
   * @response 200 baseResponse 登出
   */
  async logout() {
    const {ctx, service} = this;
    // 调用service 进行业务处理
    await service.userAccess.logout();
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx});
  }
}

module.exports = UserAccessController;