'use strict';
const md5 = require('md5');
const Service = require('egg').Service;
class GoodscategoryService extends Service {
  /**
   * 新增商品
   * @param {object} params - 条件
   * @return {string} - 商品uuid
   */
  async createGoodscategory(params = {}) {
    let { name, presentUserUuid, presentUserName } = params;
    const { app } = this;
    const crateInfo = app.getCrateInfo(presentUserUuid, presentUserName);

    const goodsCategory = { name, ...crateInfo, ownerUuid: presentUserUuid };

    return await app.model.Store.Goodscategory.createGoodscategory(goodsCategory);
  };

  async delGoodscategory(params = {}) {
    const { app } = this;
    const { uuid, presentUserUuid } = params
    await app.model.Store.Goodscategory.delGoodscategory({
      uuid,
      ownerUuid: presentUserUuid
    });

    return params.uuid;
  };

  async updateGoodscategory(params = {}) {
    const { app } = this;
    let { name, uuid, presentUserUuid, presentUserName  } = params;
    const modifyInfo = app.getModifyInfo(presentUserUuid, presentUserName);

    const goodsCategory = { name, uuid, ownerUuid: presentUserUuid, modifyInfo};

    return await app.model.Store.Goodscategory.updateGoodscategory(goodsCategory);
  };

  async getGoodscategoryList(params = {}) {
    const { app } = this;
    const { presentUserUuid } = params;
    return await app.model.Store.Goodscategory.getGoodscategoryList({
      ownerUuid: presentUserUuid,
      attributes: ['uuid', 'name'],
    });
  }

}

module.exports = GoodscategoryService;
