import * as Koa from 'koa';
import {get, post} from '../utils/route-decors';
import koaBody from 'koa-body';

const users = [{name: 'tom', age: 20}];

export default class User {
  // get
  @get('/user')
  public list(ctx: Koa.Context) {
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
    users.push(ctx.request.body);
    ctx.body = {ok:1}
  }
}