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
    const { ctx } = this;
    // this.success('fdsf');
    const { presentUserUuid: ownerUuid, uuid, presentUserName } = ctx.request.body;
    await ctx.service.order.goodsOrder.cancelOrder({
      ownerUuid, uuid, presentUserName
    })
    this.success('取消订单成功');
  };

  async queryOrderByCondition() {
    const { ctx } = this;
    const result = await ctx.service.order.goodsOrder.query(ctx.request.body);
    this.success(result)

  }
  
}

module.exports = goodsOrderController;
