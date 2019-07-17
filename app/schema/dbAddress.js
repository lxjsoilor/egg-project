'use strict';
const commonSchema = require('./commonSchema');

module.exports = app => {
  const { STRING, BIGINT, DATE, DECIMAL, TEXT, UUIDV1, ENUM, BOOLEAN } = app.Sequelize;

  return {
    ...commonSchema(app),
    address: {
      type: STRING(255),
      allowNull: false
    },
    linkMan: {
      type: STRING(76),
      allowNull: false
    },
    linkPhone: {
      type: STRING(76),
      allowNull: false
    },
    ownerUuid: {
      type: STRING(38),
      allowNull: false,
    },
    sysDefault: BOOLEAN,
    shopName: STRING(76)
  };
};
