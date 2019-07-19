'use strict';
const commonSchema = require('./commonSchema');

module.exports = app => {
  const { STRING, BIGINT, DATE, DECIMAL, TEXT, UUIDV1, ENUM } = app.Sequelize;

  return {
    ...commonSchema(app),
    ownerUuid: {
      type: STRING(38),
      allowNull: false,
    },
    unitName: {
      type: STRING(76),
      allowNull: false,
    },
    salePrice: {
      type: DECIMAL,
      allowNull: false,
    },
    goodsName: {
      type: STRING(76),
      allowNull: false,
    },
    goodsUuid: {
      type: STRING(38),
      allowNull: false,
    },
    goodsOrderUuid: {
      type: STRING(38),
      allowNull: false,
    },
    goodsCategoryName: STRING(76),
    goodsCategoryUuid: STRING(38),
    remark: STRING(255),
  };
};
