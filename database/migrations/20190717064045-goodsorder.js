'use strict';
const dbGoodsOrder = require('../../app/schema/dbGoodsOrder');
const dbGoodsOrderlines = require('../../app/schema/dbGoodsOrderlines');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const dbGoodsOrderSchema = dbGoodsOrder({ Sequelize });
    const dbGoodsOrderlinesSchema = dbGoodsOrderlines({ Sequelize });
    await queryInterface.createTable('dbGoodsOrder', dbGoodsOrderSchema);
    await queryInterface.createTable('dbGoodsOrderlines', dbGoodsOrderlinesSchema);
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
