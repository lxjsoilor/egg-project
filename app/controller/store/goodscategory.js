'use strict';

const Controller = require('../../core/base_controller');

/**
 * Controller - goods
 * @class
 * @author linxiongjun
 */
class GoodsCategoryController extends Controller {
  async createGoodscategory() {
    const { ctx } = this;
    try {
      const uuid = await ctx.service.store.goodscategory.createGoodscategory(ctx.request.body);
      this.success(uuid);
    } catch (err) {
      const { fields = {}, name } = err;

      if (name === 'SequelizeUniqueConstraintError') {
        this.fail(ctx.UNIQUE_CODE, `名称：${fields.name} 的类别已存在`);
      } else {
        throw new Error(err);
      }
    }
  };

  async delGoodscategory() {
    const { ctx } = this;
    // const goodsCount = await ctx.service.goods.countGoodsByCategory(uuid);

    // if (goodsCount > 0) {
      // this.fail(ctx.ERROR_CODE, '该类别尚有商品在使用，无法删除！');
    // } else {
      const result = await ctx.service.store.goodscategory.delGoodscategory(ctx.request.body);
      this.success(result);
    // }
  };

  async updateGoodscategory() {
    const { ctx } = this;
    const uuid = await ctx.service.store.goodscategory.updateGoodscategory(ctx.request.body);
    this.success(uuid);
  };

  async getGoodscategoryList() {
    const { ctx } = this;
    const goodscategoryList = await ctx.service.store.goodscategory.getGoodscategoryList(ctx.request.body);
    this.success(goodscategoryList);
  }

}

module.exports = GoodsCategoryController;
