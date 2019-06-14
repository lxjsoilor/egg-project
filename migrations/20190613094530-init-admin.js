'use strict';
const uuidv1 = require('uuid/v1');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   const { STRING, BIGINT, DATE, UUIDV1, ENUM } = Sequelize;
    await queryInterface.createTable('admin', {
      uuid: {
        type: STRING(38),
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV1,
      },
      lastModifiedTime: {
        type: DATE,
        allowNull: false,
      },
      lastModifierName: {
        type: STRING(76),
        allowNull: false,
      },
      lastModifierId: {
        type: STRING(38),
        allowNull: false,
      },
      createdTime: {
        type: DATE,
        allowNull: false,
      },
      creatorName: {
        type: STRING(76),
        allowNull: false,
      },
      creatorId: {
        type: STRING(38),
        allowNull: false,
      },
      name: {
        type: STRING(76),
        allowNull: false,
      },
      // enabled: '启用', disabled: '禁用'
      enableStatus: {
        type: ENUM('enabled', 'disabled'),
        allowNull: false,
      },
      userType: {
        type: ENUM('admin'),
        allowNull: false,
      },
      userName: {
        type: STRING(12),
        allowNull: false,
        unique: true,
      },
      password: {
        type: STRING(100),
        allowNull: false,
      },
      version: {
        type: BIGINT,
        defaultValue: 0,
      },
    });

    await queryInterface.bulkInsert('admin', [
      {
        uuid: uuidv1(),
        lastModifiedTime: new Date(),
        lastModifierName: 'system',
        lastModifierId: 'system',
        createdTime: new Date(),
        creatorName: 'system',
        creatorId: 'system',
        name: '管理员',
        enableStatus: 'enabled',
        userType: 'admin',
        userName: 'admin',
        password: '21232f297a57a5a743894a0e4a801fc3',
        version: 0
      }
    ])
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
