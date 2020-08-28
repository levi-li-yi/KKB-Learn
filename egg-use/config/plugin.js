'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  // 加载插件
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  }
};
