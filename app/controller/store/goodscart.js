'use strict';

const Controller = require('../../core/base_controller');

/**
 * Controller - goods
 * @class
 * @author linxiongjun
 */
class GoodscartController extends Controller {
  async createGoodscart() {
    const { ctx, app } = this;
    const { goodsUuid, goodsNum } = ctx.request.body;
    if(app._.isEmpty(goodsUuid)) {
      this.fail(300, 'goodsUuid不能为空')
    }else if(typeof goodsNum != 'number') {
      this.fail(300, '数量只能是数字')
    }else {
      const uuid = await ctx.service.store.goodscart.createGoodscart(ctx.request.body);
      this.success(uuid);
    }
  }

  async checkGoodscart() {
    const { ctx } = this;
    await ctx.service.store.goodscart.checkGoodscart(ctx.request.body);
    this.success('修改成功');
  }

  async getGoodscart() {
    const { ctx } = this;
    const result = await ctx.service.store.goodscart.getGoodscart(ctx.request.body);
    this.success(result);
  }
}

module.exports = GoodscartController;
