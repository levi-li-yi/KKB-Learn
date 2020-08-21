const http = require('http');

/* session存储在内存中的问题： 
1：大量用户登录时，内存消耗巨大；
2：分布式部署，后端开启多个实例时，无法共享session
*/
// session一般存储在数据库(MongoDB/Redis)
const session = {}

http.createServer((req, res) => {
  if (req.url === './favicon.ico') {
    res.end('')
  }

  const sessionKey = 'sid';
  const cookie = req.headers.cookie;
  if (cookie && cookie.indexOf(sessionKey) > -1) {
    res.end('Come back');
    const pattern = new RegExp(`${sessionKey}=([^;]+);?\s*`);
    const sid = pattern.exec(cookie)[1];
    console.log('session:', sid, session, session[sid]);

  } else {
    const sid = (Math.random() * 99999).toFixed();
    res.setHeader('Set-cookie', `${sessionKey}=${sid}`);
    session[sid] = {
      name: 'admin'
    }
    res.end('First')
  }


  // 观察cookie
  console.log('cookie', req.headers.cookie);

  // 设置cookie
  // res.setHeader('Set-Cookie', 'cookie=123');
  // res.end('hello cookie');

}).listen(3000)