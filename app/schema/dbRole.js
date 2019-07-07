'use strict';
const commonSchema = require('./commonSchema');

module.exports = app => {
  const { STRING, BIGINT, DATE, DECIMAL, TEXT, UUIDV1, ENUM } = app.Sequelize;
    // 角色 
    // type： 
    // 1：admin
    // 2：商家
    // 3：普通用户 
  return {
    ...commonSchema(app),
    roleName: {
        type: STRING(76),
        allowNull: false,
        unique: true
    },
    roleTypeId: {
        type: BIGINT,
        allowNull: false,
        unique: true,
        autoIncrement: true
    }
  };
};
