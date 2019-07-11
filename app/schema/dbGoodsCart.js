'use strict';
const commonSchema = require('./commonSchema');

module.exports = app => {
  const { STRING, BIGINT, DATE, DECIMAL, TEXT, UUIDV1, ENUM } = app.Sequelize;

  return {
    ...commonSchema(app),
    goodsUuid: {
      type: STRING(38),
      allowNull: false,
    },
    merchantUuid: {
      type: STRING(38),
      allowNull: false
    },
    goodsNum: {
      type: BIGINT,
      allowNull: false
    },
    isChecked: {
      type: ENUM('true', 'false'),
      allowNull: false,
      defaultValue: 'true'
    },
    ownerUuid: {
      type: STRING(38),
      allowNull: false
    }
  };
};
