const Koa = require('koa');
const app = new Koa();
const session = require('koa-session');

// keys用于全局加密算法
app.keys = ['some serect'];

const SESS_CONFIG = {
  key: 'kkb:sess',
  maxAge: '86400000',
  httpOnly: true,
  signed: true
}

app.use(session(SESS_CONFIG, app));

app.use(ctx => {
  if (ctx.path === '/favicon.ico') return;

  let n  = ctx.session.count || 0;
  ctx.session.count = ++n;
  ctx.body = `第${n}次访问`
})

app.listen(3000);

/* 鉴权方案：
1、session-cookie;
 */