const {Controller} = require('egg');

/**
 * @Controller 用户管理
 */
class UserController extends Controller {
  constructor(ctx) {
    super(ctx)
  }

  /**
   * @summary 创建用户
   * @description 创建用户 记录用户信息
   * @router post /api/user
   * @request body createUserRequest *body
   * @response 200 baseResponse 创建成功
   */
  async create () {
    const {ctx, service} = this;
    
    // 添加验证
    ctx.validate(ctx.rule.createUserRequest);
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用Service
    const res = await service.user.create(payload);
    // 设置响应应答
    ctx.helper.success({ctx, res});
  }
}

module.exports = UserController;