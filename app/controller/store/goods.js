'use strict';

const Controller = require('../../core/base_controller');

/**
 * Controller - goods
 * @class
 * @author linxiongjun
 */
class GoodsController extends Controller {
  async createGoods() {
    const { ctx } = this;
    try {
      const uuid = await ctx.service.store.goods.createGoods(ctx.request.body);
      this.success(uuid);
    } catch (err) {
      const { fields = {}, name } = err;

      if (name === 'SequelizeUniqueConstraintError') {
        this.fail(ctx.UNIQUE_CODE, `名称：${fields.name} 的类别已存在`);
      } else {
        throw new Error(err);
      }
    }
  }

  async delGoods() {
    const { ctx } = this;
    const { uuid, presentUserUuid } = ctx.request.body;
    await ctx.service.store.goods.delGoods({
      uuid,
      ownerUuid: presentUserUuid
    });
    this.success('删除成功');
  }

  async queryGoodsByCondition() {
    const { ctx } = this;
    const goodsData = await ctx.service.store.goods.queryGoodsByCondition(ctx.request.body);
    console.log(goodsData);
    this.success(goodsData);
  }

  async queryGoodsByCategory() {
    const { ctx } = this;
    const { presentUserUuid: ownerUuid } = ctx.request.body;
    
    const result = await ctx.service.store.goods.queryGoodsByCategory({
      ownerUuid
    });
    this.success(result);
  };

  async updateGoods() {
    const { ctx, app } = this;
    const { uuid } = ctx.request.body;
    if(app._.isEmpty(uuid)) {
      this.fail('uuid不能为空')
    }else {
      await ctx.service.store.goods.updateGoods(ctx.request.body);
      this.success('修改成功')      
    }
  };

}

module.exports = GoodsController;
