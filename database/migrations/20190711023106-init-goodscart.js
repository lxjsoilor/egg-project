'use strict';
const dbGoodsCart = require('../../app/schema/dbGoodsCart');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const dbGoodsCartSchema = dbGoodsCart({ Sequelize });
    await queryInterface.createTable('dbGoodscart', dbGoodsCartSchema);
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
