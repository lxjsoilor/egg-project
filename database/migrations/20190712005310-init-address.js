'use strict';
const dbAddress = require('../../app/schema/dbAddress');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const dbAddressSchema = dbAddress({ Sequelize });
    await queryInterface.createTable('dbAddress', dbAddressSchema);
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
