'use strict';
const dbUser = require('../../app/schema/dbUser');
const dbRole = require('../../app/schema/dbRole');
const dbUser_Role = require('../../app/schema/dbUser_Role');
const uuidv1 = require('uuid/v1');
const userUuid = uuidv1();
const roleUuid = uuidv1();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const dbUserSchema = dbUser({ Sequelize });
    const dbRoleSchema = dbRole({ Sequelize });
    const dbUser_RoleSchema = dbUser_Role({ Sequelize });
    await queryInterface.createTable('dbUser', dbUserSchema);
    await queryInterface.createTable('dbRole', dbRoleSchema);
    await queryInterface.createTable('dbUser_Role', dbUser_RoleSchema);
    await queryInterface.bulkInsert('dbUser', [{
      uuid: userUuid,
      lastModifiedTime: new Date(),
      lastModifierName: 'system',
      lastModifierId: 'system',
      createdTime: new Date(),
      creatorName: 'system',
      name: '管理员',
      userName: 'admin',
      password: '21232f297a57a5a743894a0e4a801fc3',
      userType: 'admin'
    }]);
    await queryInterface.bulkInsert('dbRole', [{
      uuid: 1000,
      lastModifiedTime: new Date(),
      lastModifierName: 'system',
      lastModifierId: 'system',
      createdTime: new Date(),
      creatorName: 'system',
      roleName: 'admin',
      roleTypeId: '1'
    },{
      uuid: 1001,
      lastModifiedTime: new Date(),
      lastModifierName: 'system',
      lastModifierId: 'system',
      createdTime: new Date(),
      creatorName: 'system',
      roleName: 'merchant', // 商家
      roleTypeId: '2'
    },{
      uuid: 1002,
      lastModifiedTime: new Date(),
      lastModifierName: 'system',
      lastModifierId: 'system',
      createdTime: new Date(),
      creatorName: 'system',
      roleName: 'consumer', // 普通用户
      roleTypeId: '3'
    },]);
    await queryInterface.bulkInsert('dbUser_Role', [{
      uuid: uuidv1(),
      lastModifiedTime: new Date(),
      lastModifierName: 'system',
      lastModifierId: 'system',
      createdTime: new Date(),
      creatorName: 'system',
      userUuid: userUuid,
      roleUuid: 1000,
      roleName: 'admin',
      roleTypeId: 1
    }]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
