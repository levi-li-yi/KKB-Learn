/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1598426293005_9390';

  // add your middleware config here
  config.middleware = ['errorHandler'];

  // 定义swaggerdoc
  config.swaggerdoc = {
    dirScanner: './app/controller',
    apiInfo: {
      title: '接口',
      description: '接口 swagger-ui',
      version: '1.0.0'
    },
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    enableSecurity: false,
    routerMap: true,
    enable: true
  };

  // 定义mongoose
  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/expressDB',
    options: {
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      bufferMaxEntries: 0
    }
  }

  // jwt
  config.jwt = {
    secret: 'Great4-M',
    enable: true,
    match: /^\/api/
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
