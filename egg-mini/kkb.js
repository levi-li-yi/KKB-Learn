const Koa = require('koa');
const {initRouter, initController, initService, loadConfig, initSchedule} = require('./loader');

class kkb {
  constructor(conf) {
    this.$app = new Koa(conf);
    loadConfig(this);

    this.$service = initService();
    this.$ctrl = initController(this);
    this.$router = initRouter(this);
    this.$app.use(this.$router.routes());
    initSchedule();
  }
  start(port) {
    this.$app.listen(port, () => {
      console.log('启动成功');
    })
  }
}

module.exports = kkb;