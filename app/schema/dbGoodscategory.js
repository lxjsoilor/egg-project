'use strict';
const commonSchema = require('./commonSchema');

module.exports = app => {
  const { STRING, BIGINT, DATE, DECIMAL, TEXT, UUIDV1, ENUM } = app.Sequelize;

  return {
    ...commonSchema(app),
    name: {
      type: STRING(76),
      allowNull: false,
      unique: true,
    },
    ownerUuid: {
      type: STRING(38),
      allowNull: false,
    }
  };
};
