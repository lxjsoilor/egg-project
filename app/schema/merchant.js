'use strict';
const commonSchema = require('./commonSchema');

module.exports = app => {
  const { STRING, BIGINT, DATE, DECIMAL, TEXT, UUIDV1, ENUM } = app.Sequelize;

  return {
    ...commonSchema(app),
    merchantName: {
      type: STRING(76),
      allowNull: false,
    },
    merchantCode: {
      type: STRING(76),
      allowNull: false,
      unique: true
    },
    enableStatus: {
      type: ENUM('normal', 'forbid'),
      allowNull: false,
    },
    businessStatus: {
      type: ENUM('open', 'close'),
      allowNull: false,
    },
    district: {
      type: STRING(76),
      allowNull: false,
    },
    startBusiness: {
      type: DATE,
      allowNull: false,
    },
    endBusiness: {
      type: DATE,
      allowNull: false,
    },
    remark: STRING(255),
    address: STRING(255),
    servicePhone: STRING(12),
    simplyName: STRING(76),
    longitude: STRING(76),
    latitude: STRING(76),
  };
};
