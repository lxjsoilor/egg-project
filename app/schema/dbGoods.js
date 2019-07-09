'use strict';
const commonSchema = require('./commonSchema');

module.exports = app => {
  const { STRING, BIGINT, DATE, DECIMAL, TEXT, UUIDV1, ENUM } = app.Sequelize;

  return {
    ...commonSchema(app),
    name: {
      type: STRING(76),
      allowNull: false,
    },
    status: {
      type: ENUM('up', 'down'),
      allowNull: false,
    },
    categoryUuid: STRING(38),
    categoryName: STRING(38),
    ownerUuid: {
      type: STRING(38),
      allowNull: false,
    },
    unitName: {
      type: STRING(76),
      allowNull: false,
    },
    standard: STRING(38),
    material: STRING(38),
    packaging: STRING(38),
    expirationDate: STRING(38),
    spec: STRING(255),
    goodsInfo: TEXT,
    salePrice: DECIMAL,
    thumbnail: STRING(255),
    imagesJsonStr: STRING(2000),
  };
};
