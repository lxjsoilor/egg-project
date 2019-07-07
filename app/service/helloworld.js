'use strict';

const Service = require('egg').Service;

/**
 * Service - 商品
 * @class
 * @author ruiyong-lee
 */
class HelloworldService extends Service {
  /**
   * 新增商品
   * @param {object} params - 条件
   * @return {string} - 商品uuid
   */
  async test(params = {}) {
    const { app } = this;
    return await app.model.Helloworld.test({...params,version:2});
  }
}

module.exports = HelloworldService;
