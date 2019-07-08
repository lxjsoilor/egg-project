'use strict';
const commonSchema = require('./commonSchema');

module.exports = app => {
  const { STRING, BIGINT, DATE, DECIMAL, TEXT, UUIDV1, ENUM } = app.Sequelize;

  return {
    ...commonSchema(app),
    name: {
        type: STRING(76),
        allowNull: false
    },
    userName: {
        type: STRING(12),
        allowNull: false,
        unique: true
    },
    password: {
        type: STRING(100),
        allowNull: false
    },
    userType: {
        type: ENUM('admin', 'other')
    },
    storeUuid: {
      type: STRING(38),
      unique: true
    }
  };
};
