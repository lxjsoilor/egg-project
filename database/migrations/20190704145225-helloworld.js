'use strict';
const helloworld = require('../../app/schema/helloworld');
const uuidv1 = require('uuid/v1');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const helloworldSchema = helloworld({ Sequelize });
    await queryInterface.createTable('helloworld', helloworldSchema);
    await queryInterface.bulkInsert('helloworld', [{
      uuid: uuidv1(),
      lastModifiedTime: new Date(),
      lastModifierName: 'test',
      lastModifierId: 'test',
      createdTime: new Date(),
      creatorName: 'test'
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
