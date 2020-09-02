import * as glob from 'glob';
import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
import koaBody from 'koa-body';

type HTTPMethod = 'get' | 'put' | 'del' | 'post' | 'patch';
type LoadOptions  = {
  /**
   * 路由文件扩展名， 默认值是`.{js,ts}`
   */
  extname?: string
};
type RouteOptions = {
  /**
   * 适用于某个请求比较特殊，需要单独制定前缀的情形
   */
  prefix?: string;
  /**
   * 给当前路由添加一个或多个中间件
   */
  middlewares?: Array<Koa.Middleware>;
}

const router = new KoaRouter();
const decorate = (method: HTTPMethod, path: string, options: RouteOptions = {}, router: KoaRouter) => {
  return (target, property) => {
    // nextTick
    process.nextTick(() => {
      // 加载中间件
      const middlwares = [];

      // 类级别的中间件
      if (target.middlewares) {
        middlwares.push(...target.middlewares)
      }

      // 方法级别的中间件
      if (options.middlewares) {
        middlwares.push(...options.middlewares)
      }
      // 添加路由处理
      middlwares.push(target[property]);

      const url = options && options.prefix ? options.prefix + path : path;
      router[method](url, target[property]);
    })
  }
}
const method = method => (path: string, options?: RouteOptions) => decorate(method, path, options, router);

export const get = method('get');
export const post = method('post');

export const middlewares = function middlewares(middlewares: Koa.middleware[]) {
  return function(target) {
    target.prototype.middlewares = middlewares;
  }
};
export const load = (folder: string, options: LoadOptions = {}): KoaRouter => {
  const extname = options.extname || '.{js,ts}';
  glob.sync(require('path').join(folder, `./**/*${extname}`))
      .forEach(item => require(item))
      return router;
}