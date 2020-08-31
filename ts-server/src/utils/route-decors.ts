import * as glob from 'glob';
import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';

type HTTPMethod = 'get' | 'put' | 'del' | 'post' | 'patch';
type LoadOptions  = {
  /**
   * 路由文件扩展名， 默认值是`.{js,ts}`
   */
  extname?: string
};