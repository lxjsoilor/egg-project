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

}

module.exports = GoodsService;
