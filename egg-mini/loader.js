const fs = require('fs');
const path = require('path');
const Router = require('koa-router');

// 读取目录
function loader(dir, cb) {
  const url = path.resolve(__dirname, dir);
  const files = fs.readdirSync(url);
  files.forEach(filename => {
    filename = filename.replace('.js', '');
    // 获取文件
    const file = require(url + '/' + filename);
    cb(filename, file);
  })
}
// 初始化router
function initRouter(app) {
  const router = new Router();
  loader('routes', (filename, routes) => {
    const prefix = filename === 'index' ? '' : `/${filename}`;
    // 判断routes是否为function
    routes = typeof routes === 'function' ? routes(app) : routes;

    Object.keys(routes).forEach(key => {
      // 获取方法和路径：'get /'
      const [method, path] = key.split(' ');
      // router执行:路由方法fn(路径，中间件)
      // router[method](prefix + path, routes[key]);
      router[method](prefix + path, async ctx => {
        app.ctx = ctx;
        await routes[key](app);
      });
    })
  })
  return router;
}
// 初始化controller
function initController(app) {
  const controllers = {};
  loader('controller', (filename, controller) => {
    controllers[filename] = controller(app);
  })
  return controllers;
}
// 初始化service
function initService() {
  const service = {};
  loader('service', (filename, fn) => {
    service[filename] = fn;
  })
  return service;
}

// 数据库配置
const Sequelize = require('sequelize');
function loadConfig(app) {
  loader('config', (filename, conf) => {
    if (conf.db) {
      app.$db = new Sequelize(conf.db);

      // 加载模型
      app.$model = {};
      loader('model', (filename, {schema, options}) => {
        app.$model[filename] = app.$db.define(filename, schema, options);
      })
      console.log(app.$model);
      app.$db.sync();
    }

    // 根据顺序加载中间件
    if (conf.middleware) {
      conf.middleware.forEach(mid => {
        const midPath = path.resolve(__dirname, 'middleware', mid);
        app.$app.use(require(midPath)); // 加载中间件
      })
    }
  })
}
// 初始化批处理任务
const schedule = require('node-schedule');
function initSchedule() {
  loader('schedule', (filename, config) => {
    schedule.scheduleJob(config.interval, config.handler)
  })
}


module.exports  = { initRouter, initController, initService, loadConfig, initSchedule };