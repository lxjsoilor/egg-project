'use strict';
const dbGoodscategory = require('../../app/schema/dbGoodscategory');
const dbGoods = require('../../app/schema/dbGoods');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const dbGoodscategorySchema = dbGoodscategory({ Sequelize });
    const dbGoodsSchema = dbGoods({ Sequelize });
    await queryInterface.createTable('dbGoodscategory', dbGoodscategorySchema);
    await queryInterface.createTable('dbGoods', dbGoodsSchema);
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
