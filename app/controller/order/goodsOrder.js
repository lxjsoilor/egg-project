'use strict';

const Controller = require('../../core/base_controller');

/**
 * Controller - goods
 * @class
 * @author linxiongjun
 */
class goodsOrderController extends Controller {
  async createOrder() {
    const { ctx } = this;
    const { presentUserUuid: ownerUuid, presentUserName, merchantUuid, address, linkPhone, linkMan } = ctx.request.body;
    const result = await ctx.service.order.goodsOrder.createOrder({
      ownerUuid, presentUserName, merchantUuid, address, linkPhone, linkMan
    });
    this.success(result);
  };

  async cancelOrder() {
    this.success('fdsf');
  }
  
}

module.exports = goodsOrderController;
