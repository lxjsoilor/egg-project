'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  sequelize: {
    enable: true,
    package: 'egg-sequelize'
  },

  jwt: {
    enable: true,
    package: 'egg-jwt'
  },

  sessionRedis: {
    enable: true,
    package: 'egg-session-redis',
  },
   
  redis: {
    enable: true,
    package: 'egg-redis',
  },

  passport: {
    enable: true,
    package: 'egg-passport',
  }
};
