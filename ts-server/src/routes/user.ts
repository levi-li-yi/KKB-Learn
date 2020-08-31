import * as Koa from 'koa';

const users = [{name: 'tom', age: 20}];

export default class User {
  // get
  public list(ctx: Koa.Context) {
    ctx.body = {ok:1, data: users}
  }
  // post 
  public add(ctx: Koa.Context) {
    users.push(ctx.request.body);
    ctx.body = {ok:1}
  }
}