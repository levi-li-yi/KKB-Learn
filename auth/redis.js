const redis = require('redis');

// 连接localhost:6379的redis服务器
const client = redis.createClient(6379, 'localhost');

// 存入redis
client.set('hello', 'This is a value');

// 从redis取值
client.get('hello', function (err, v) {
  console.log('redis get:', v);
})