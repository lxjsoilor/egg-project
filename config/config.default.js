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
  config.keys = appInfo.name + '_1560126065337_8620';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.cluster = {
    listen: {
      path: '',
      port: 7002,
      hostname: 'localhost'
    }
  };

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    database: 'weapp-vue-eggjs-shop-demo',
    port: '3306',
    username: 'root',
    password: 'root',
    timezone: '+08:00'
  };

  config.sessionRedis = {
    key: "EGG_SESSION",
    maxAge: 1800 * 1000, // 1 天
    httpOnly: true,
    encrypt: false
  };

  config.middleware = ['errorHandler'];

  config.jwt = {
    secret: 'sailor'
  };

  config.session = {
    key: 'SAILOR_KEY',
    maxAge: 1000 * 60,
    httpOnly: true,
    encrypt: true,
    renew: true
  }

  config.redis = {
    clients: {
      default: {
        host: 'localhost',
        port: '6379',
        password: '',
        db: '0',
      }
    },
    agent: true
  };

  exports.security = {
    csrf: {
      enable: false,
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
