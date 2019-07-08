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
    try {
      ctx.service.store.merchant.createMerchant({
        merchantName, merchantCode, enableStatus, businessStatus, district, startBusiness, endBusiness
      })
    }catch (err) {
      console.log(err);
    }
    this.success('merchant')
  };
}

module.exports = MerchantController;
