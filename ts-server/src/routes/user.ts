import * as Koa from 'koa';
import { get, post, middlewares } from '../utils/route-decors';
import model from '../model/user';

// const users = [{name: 'tom', age: 20}];

@middlewares([
  async function guard(ctx: Koa.Context, next: () => Promise<any>) {
    if (ctx.header.token) {
      await next();
    } else {
      throw '请登录';
    }
  }
])
export default class User {
  // get
  @get('/user')
  public async list(ctx: Koa.Context) {
    const users = await model.findAll();
    ctx.body = {ok:1, data: users}
  }
  // post
  @post('/user', {
    middlewares: [
      async function validation(ctx: Koa.Context, next: () => Promise<any>) {
        const name = ctx.request.body.name;
        if (!name) {
          throw '请输入用户名';
        } else {
          await next();
        }
      } 
    ]
  }) 
  public add(ctx: Koa.Context) {
    // users.push(ctx.request.body);
    ctx.body = {ok:1}
  }
}