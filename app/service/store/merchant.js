'use strict';
const md5 = require('md5');
const Service = require('egg').Service;
class HelloworldService extends Service {
  /**
   * 新增商品
   * @param {object} params - 条件
   * @return {string} - 商品uuid
   */
  async createMerchant(params = {}) {
    const { app } = this;
    return await app.model.Store.Merchant.createMerchant({
      ...params
    });
  };
}

module.exports = HelloworldService;
