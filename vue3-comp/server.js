const fs = require('fs');
const path = require('path');

const Koa = require('koa');
const compilerSfc = require('@vue/compiler-sfc');
const compilerDom = require('@vue/compiler-dom');

const app = new Koa();

// vite原理：使用node监听http请求

// @TODO
// 支持node_modules中的vue

// 支持.vue,浏览器只认识.js文件:
//将.vue单文件拆成script、template;
//并将template转化成render函数,然后拼成一个对象
// script.render = render

// 支持csss

// 覆盖引入时路径不是以/、./、../开头的，统一修改成'from /@modules/XX'; 然后koa监听到存在@modules的请求后就从node_modules中查找
function rewriteImport(content) {
  return content.replace(/ from ['|"]([^'"]+)['|"]/g, function(s0, s1) {
    // console.log(s0, s1);
    if(s0[0] !=='.'&&s1[1]!=='/') {
      return ` from '/@modules/${s1}'`
    } else {
      return s0
    }
  })
}

// 拦截浏览器的http请求
app.use(ctx => {
  const {request: {url,query}} = ctx;
  console.log('hah',url);
  if(url === '/') {
    let content = fs.readFileSync('./index.html', 'utf-8');
    content = content.replace('<script', `
      <script>
      // 热更新：注入socket客户端，后端文件变化通知前端更新
      window.process = {
        env: {NODE_ENV: 'dev'}
      }
      </script>
      <script
    `)
    ctx.type = 'text/html';
    ctx.body = content;
  } else if (url.endsWith('.css')) { // 同理，可以支持less、scss、stylus、ts等
    const p = path.resolve(__dirname, url.slice(1));
    const file = fs.readFileSync(p, 'utf-8');
    const content = `
    const css = "${file.replace(/\n/g, '')}"
    const link = document.createElement('style')
    link.setAttribute('type', 'text/css')
    document.head.appendChild(link)
    link.innerHTML = css
    export default link
    `
    ctx.type = 'application/javascript';
    ctx.body = rewriteImport(content);
  }else if(url.endsWith('.js')) { // 请求中链接中包含".js"，处理js文件, 读取到文件的
    const p = path.resolve(__dirname, url.slice(1));
    ctx.type = 'application/javascript';
    const content = fs.readFileSync(p, 'utf-8');
    ctx.body = rewriteImport(content);
  } else if (url.startsWith('/@modules/')) {
    // 非本地文件而是nodel_modules中的
    const prefix = path.resolve(__dirname, 'node_modules', url.replace('/@modules/', ''));
    const module = require(prefix+'/package.json').module;
    const p = path.resolve(prefix, module)
    // p=D:\KKB-Learn\vue3-comp\node_modules\@vue\shared\dist\shared.esm-bundler.js
    // p=D:\KKB-Learn\vue3-comp\node_modules\vue\dist\vue.runtime.esm-bundler.js
    const ret = fs.readFileSync(p, 'utf-8');
    ctx.type = 'application/javascript';
    ctx.body = rewriteImport(ret);
  } else if(url.indexOf('.vue') > -1) {
    // 单文件组件解析
    const p = path.resolve(__dirname, url.split('?')[0].slice(1));
    // 解析单文件组件使用官方库（@vue/compiler-sfc）
    const {descriptor} = compilerSfc.parse(fs.readFileSync(p, 'utf-8'));
    console.log(descriptor);
    // 将Vue单文件中的script内容变成一个对象，将template内容变成一个新的import{render as _render} from '/src/XX.vue?type=template'网络请求
    if(!query.type) {
      // 则是需要解析js部分
      ctx.type = 'application/javascript';
      ctx.body = `
      ${rewriteImport(descriptor.script.content.replace('export default ', `const __script = `))}
      import {render as __render} from "${url}?type=template"
      __script.render = __render
      export default __script
      `
    } else if (query.type === 'template') {
      //  解析template, 编译成render函数
      const template = descriptor.template;
      const render = compilerDom.compile(template.content, {mode: 'module'}).code;
      ctx.type = 'application/javascript';
      ctx.body = rewriteImport(render);
    }
  }
})

app.listen(9092, () => {
})