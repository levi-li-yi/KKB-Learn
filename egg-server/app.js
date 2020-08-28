
class AppBootHook {
  constructor(app) {
    this.app = app;
    app.root_path = __dirname;
  }

  configWillLoad() {

  }

  configDidLoad() {

  }

  async didLoad() {

  }

  async willReady() {

  }

  async didReady() {
    const ctx = await this.app.createAnonymousContext();
    await ctx.model.User.remove();
    await ctx.service.user.create({
      mobile: '1231',
      password: '12321',
      realName: 'xia'
    })
  }

  async serverDidReady() {

  }

  async beforeClose() {

  }
}
module.exports = AppBootHook;