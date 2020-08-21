(async () => {
  const Sequelize = require('sequelize');
  // 连接
  const sequelize = new Sequelize( 'kkb', 'root', '123456', {
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    operatorsAliases: false
  })
  console.log(sequelize);
  
  // 定义模型
  const Fruit = sequelize.define('Fruit', {
    id: {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.DataTypes.UUIDV1,
      primaryKey: true
    },
    name: { type: Sequelize.STRING(20), allowNull: false },
    price: { type: Sequelize.FLOAT, allowNull: false },
    stock: { type: Sequelize.INTEGER, defaultValue: 0 }
  }, {
    // timestamps: false,
    // tableName: 'TBL_FRUIT'
    // underscored: true
  })

  // 同步数据库-建表
  let ret = await Fruit.sync();
  // 插入数据
  ret = await Fruit.create({
    name: '苹果',
    price: 6,
    stock: 2
  })

  //  查询
  ret = await Fruit.findAll();
  // console.log(JSON.stringify(ret));
  // 更新
  await Fruit.update({price: 6}, {
    where: {
      name: '猕猴桃'
    }
  })

  // 按条件查询
  const Op = Sequelize.Op;
  ret = await Fruit.findAll({
    where: { price: { [Op.lt]: 8, [Op.gt]: 2}}
  })
  console.log(JSON.stringify(ret));

})();