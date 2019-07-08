'use strict';

const Controller = require('../../core/base_controller');

/**
 * Controller - goods
 * @class
 * @author linxiongjun
 */
class MerchantController extends Controller {
  async createMerchant() {
    const { ctx } = this;
    const { merchantName, merchantCode, enableStatus, businessStatus, district, startBusiness, endBusiness } = ctx.request.body;
    try{
      const result = await ctx.service.store.merchant.createMerchant({
        merchantName, merchantCode, enableStatus, businessStatus, district, startBusiness, endBusiness
      })
      this.success(result.uuid)
    }catch (err) {
      if(err.name === 'SequelizeUniqueConstraintError') {
        this.fail('门店编号已经存在')
      }else {
        throw new Error(err)
      }
    }
  };

  async relevanceUser() {
    const { ctx, app } = this;
    const { uuid, userName } = ctx.request.body;
    if(app._.isEmpty(uuid)) {
      this.fail('门店uuid不能为空')
    }else if(app._.isEmpty(userName)) {
      this.fail('绑定的用户名不能为空')
    }else {
      const result = await ctx.service.store.merchant.relevanceUser({
        uuid,
        userName
      });
      this.success(result);
    }
  };

  async updateMerchant() {
    const { ctx, app } = this;
    const { uuid, merchantData } = ctx.request.body;
    if(app._.isEmpty(uuid)) {
      this.fail(300, '店铺uuid不能为空')
    }else if(app._.isEmpty(merchantData)) {
      this.fail(300, '需要更新的数据不能为空')
    }else {
      const result = await ctx.service.store.merchant.updateMerchant({
        uuid,
        merchantData
      });
      this.success(result)
    }
  }
}

module.exports = MerchantController;
