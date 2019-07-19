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
    type: STRING(20),
    // initial: '待处理', audited: '已接单', dispatching: '配送中', completed: '已完成', canceled: '已取消'
    status: ENUM('initial', 'audited', 'dispatching', 'completed', 'canceled', 'autocanceled'),
    goodsTotalQty: {
      type: DECIMAL,
      allowNull: false,
    },
    deliveryTimeTypeSurcharge: DECIMAL,
    paymentAmount: DECIMAL,
    reductionAmount: DECIMAL,
    totalAmount: {
      type: DECIMAL,
      allowNull: false,
    },
    freightAmount: DECIMAL,
    remark: STRING(255),
    merchantUuid: {
      type: STRING(38),
      allowNull: false,
    }
  };
};
