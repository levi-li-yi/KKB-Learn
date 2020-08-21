( async () => {
    const mysql = require('mysql2/promise');
    // 连接
    const cfg = {
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: '123456',
      database: 'kkb'
    }
    const connection = await mysql.createPool(cfg);
    // 创建表
    let ret = await connection.execute(`CREATE TABLE IF NOT EXISTS test (
      id INT NOT NULL AUTO_INCREMENT,
      message VARCHAR(45) NULL,
      PRIMARY KEY (id)
    )`)
    // insert
    // res = await connection.execute(`INSERT INTO test(message) VALUE(?)`, ['aaa'])
    // 查询
    const [rows, fields] = await connection.execute(`
      SELECT * FROM test
    `)
    console.log(rows);

    // 像操作对象一样操作数据库（ORM），sequelize中间件
    
  }
)()