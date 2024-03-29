'use strict';
const md5 = require('md5');
const Service = require('egg').Service;
class GoodsService extends Service {
  /**
   * 新增商品
   * @param {object} params - 条件
   * @return {string} - 商品uuid
   */
  async createGoods(params = {}) {
    const { app } = this;
    let { presentUserUuid, presentUserName } = params;
    const crateInfo = app.getCrateInfo(presentUserUuid, presentUserName);

    return await app.model.Store.Goods.createGoods({
      ...params,
      ...crateInfo
    });
  };

  async delGoods(params = {}) {
    const { app } = this;
    await app.model.Store.Goods.delGoods({
      ...params
    })
  };

  async queryGoodsByCondition(params = {}) {
    const { app } = this;
    const goodsData = await app.model.Store.Goods.queryGoodsByCondition({
      ...params
    });
    const { presentUserUuid: ownerUuid } = params;
    console.log(goodsData)
    if(goodsData.count > 0) {
      for(const row of goodsData.rows) {
        const { categoryUuid:uuid } = row || {};
        const goodscategory = await app.model.Store.Goodscategory.get({
          uuid,
          ownerUuid,
          attributes: ['name']
        });
        if(!app._.isEmpty(goodscategory)) {
          row.dataValues.goodCategoryName = goodscategory.name;
        }
      }
    };
    return goodsData
  };

  async queryGoodsByCategory(params = {}) {
    const { app } = this;
    const { ownerUuid } = params;
    const result = await app.model.Store.Goods.queryGoodsByCategory({
      ownerUuid,
      categoryAttributes: ['name'],
      goodsAttributes: ['uuid', 'name', 'categoryUuid', 'unitName', 'salePrice']
    });
    return result;
  };

  async updateGoods(params = {}) {
    const { app } = this;
    const { uuid, unitName, name, standard, material, packaging, expirationDate, spec, goodsInfo, presentUserUuid, presentUserName, salePrice } = params;
    const modifyInfo = app.getModifyInfo(presentUserUuid, presentUserName);
    const result = await app.model.Store.Goods.updateGoods({ uuid, ownerUuid: presentUserUuid, unitName, name, standard, material, packaging, expirationDate, spec, goodsInfo, salePrice, modifyInfo });
    return result;
  }

}

module.exports = GoodsService;
