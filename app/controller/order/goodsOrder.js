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

  };

  async auditedOrder() {
    const { ctx } = this;
    const { presentUserUuid: ownerUuid, uuid, presentUserName } = ctx.request.body;
    await ctx.service.order.goodsOrder.auditedOrder({
      ownerUuid, uuid, presentUserName
    })
    this.success('取消订单成功');
  };

  async dispatchingOrder() {
    const { ctx } = this;
    const { presentUserUuid: ownerUuid, uuid, presentUserName } = ctx.request.body;
    await ctx.service.order.goodsOrder.dispatchingOrder({
      ownerUuid, uuid, presentUserName
    })
    this.success('订单派送中');
  };

  async completedOrder() {
    const { ctx } = this;
    const { presentUserUuid: ownerUuid, uuid, presentUserName } = ctx.request.body;
    await ctx.service.order.goodsOrder.completedOrder({
      ownerUuid, uuid, presentUserName
    })
    this.success('完成订单');
  };

  async autocanceledOrder() {
    const { ctx } = this;
    const { presentUserUuid: ownerUuid, uuid, presentUserName } = ctx.request.body;
    await ctx.service.order.goodsOrder.autocanceledOrder({
      ownerUuid, uuid, presentUserName
    })
    this.success('自动取消订单');
  };
  
}

module.exports = goodsOrderController;
