'use strict';
const helloworld = require('../../app/schema/helloworld');
const uuidv1 = require('uuid/v1');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('helloworld', 'columnC' , {
      type: Sequelize.STRING(38),
      unique: true
    },  {
      after: 'version' 
   })
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
