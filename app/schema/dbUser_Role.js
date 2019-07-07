'use strict';
const commonSchema = require('./commonSchema');

module.exports = app => {
  const { STRING, BIGINT, DATE, DECIMAL, TEXT, UUIDV1, ENUM } = app.Sequelize;

  return {
    ...commonSchema(app),
    userUuid: {
        type: STRING(38),
        allowNull: false
    },
    roleUuid: {
        type: STRING(38),
        allowNull: false
    },
    roleName: {
      type: STRING(76),
      allowNull: false
    },
    roleTypeId: {
      type: BIGINT,
      allowNull: false
    }
  };
};
