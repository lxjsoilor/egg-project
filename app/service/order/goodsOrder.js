'use strict';
const md5 = require('md5');
const Service = require('egg').Service;
class GoodsService extends Service {

  async createOrder(params = {}) {
    const { app } = this;
    const { ownerUuid, presentUserName, merchantUuid, address, linkPhone, linkMan } = params;
    const crateInfo = app.getCrateInfo(ownerUuid, presentUserName);
    // const modifyInfo = app.getModifyInfo(presentUserUuid, presentUserName);
    return await app.model.Order.GoodsOrder.createOrder({
      ownerUuid,
      merchantUuid,
      address,
      linkPhone,
      linkMan,
      crateInfo
    })
  };

  async cancelOrder(params = {}) {
    const { app } = this;
    const { ownerUuid, uuid, presentUserName } = params;
    const modifyInfo = app.getModifyInfo(ownerUuid, presentUserName);

    await app.model.Order.GoodsOrder.updateGoodsOrder({
      fieldChange: {
        status: 'canceled',
        ...modifyInfo
      },
      condition: {
        ownerUuid, uuid
      }
    })
  };

  async auditedOrder(params = {}) {
    const { app } = this;
    const { ownerUuid, uuid, presentUserName } = params;
    const modifyInfo = app.getModifyInfo(ownerUuid, presentUserName);

    await app.model.Order.GoodsOrder.updateGoodsOrder({
      fieldChange: {
        status: 'audited',
        ...modifyInfo
      },
      condition: {
        ownerUuid, uuid
      }
    })
  };

  async dispatchingOrder(params = {}) {
    const { app } = this;
    const { ownerUuid, uuid, presentUserName } = params;
    const modifyInfo = app.getModifyInfo(ownerUuid, presentUserName);

    await app.model.Order.GoodsOrder.updateGoodsOrder({
      fieldChange: {
        status: 'dispatching',
        ...modifyInfo
      },
      condition: {
        ownerUuid, uuid
      }
    })
  };

  async completedOrder(params = {}) {
    const { app } = this;
    const { ownerUuid, uuid, presentUserName } = params;
    const modifyInfo = app.getModifyInfo(ownerUuid, presentUserName);

    await app.model.Order.GoodsOrder.updateGoodsOrder({
      fieldChange: {
        status: 'completed',
        ...modifyInfo
      },
      condition: {
        ownerUuid, uuid
      }
    })
  };

  async autocanceledOrder(params = {}) {
    const { app } = this;
    const { ownerUuid, uuid, presentUserName } = params;
    const modifyInfo = app.getModifyInfo(ownerUuid, presentUserName);

    await app.model.Order.GoodsOrder.updateGoodsOrder({
      fieldChange: {
        status: 'autocanceled',
        ...modifyInfo
      },
      condition: {
        ownerUuid, uuid
      }
    })
  };

  async query(params = {}) {
    const { app } = this;
    const { Sequelize } = app;
    return await app.model.Order.GoodsOrder.query({
      ...params,
      attributes: [
        'createdTime', 'uuid', 'status', 'linkMan', 'linkPhone', 'goodsTotalQty', 'deliveryTimeTypeSurcharge',
        [Sequelize.fn('ROUND', Sequelize.col('paymentAmount'), 2), 'paymentAmount'],
        [Sequelize.fn('ROUND', Sequelize.col('freightAmount'), 2), 'freightAmount'],
        [Sequelize.fn('ROUND', Sequelize.col('totalAmount'), 2), 'totalAmount'],
        [Sequelize.fn('ROUND', Sequelize.col('reductionAmount'), 2), 'reductionAmount'],
      ],
    });
  };

  async getOrderDetails(params = {}) {
    const { app } = this;
    const { uuid } = params;
    return app.model.Order.GoodsOrder.getOrderDetails({ uuid });
  }

}

module.exports = GoodsService;
