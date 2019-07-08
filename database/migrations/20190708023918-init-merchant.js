'use strict';
const merchant = require('../../app/schema/merchant');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const merchantSchema = merchant({ Sequelize });
    await queryInterface.createTable('merchant', merchantSchema);
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
