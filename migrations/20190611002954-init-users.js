'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

   const { INTEGER, DATE, STRING } = Sequelize;
   await queryInterface.createTable('myUsers', {
     id: {
       type: INTEGER,
       primaryKey: true,
       autoIncrement: true
     },
     lastModifiedTime: {
       type: DATE,
       allowNull: false
     },
     lastModifierName: {
       type: STRING(76),
       allowNull: false
     }
   })
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    await queryInterface.dropTable('myUsers');
  }
};
