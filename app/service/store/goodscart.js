'use strict';
const md5 = require('md5');
const Service = require('egg').Service;
class GoodscartService extends Service {
  
  async createGoodscart(params = {}) {
    const { app } = this;
    let { goodsUuid, goodsNum, presentUserUuid, presentUserName, merchantUuid } = params;
    const crateInfo = app.getCrateInfo(presentUserUuid, presentUserName);
    const modifyInfo = app.getModifyInfo(presentUserUuid, presentUserName);

    // 查看购物车是否存在该商品
    const goodsCartCount = await app.model.Store.Goodscart.goodsCartCount({
      goodsUuid,
      ownerUuid: presentUserUuid
    })

    if(goodsNum === 0) {
      // 删除购物车商品
      if(goodsCartCount > 0) {
        return await app.model.Store.Goodscart.delCart({
          goodsUuid,
          ownerUuid: presentUserUuid
        })
      }else {
        return {}
      }
    }else {
      // 增加购物车商品
      if(goodsCartCount > 0) {
        return await app.model.Store.Goodscart.updateCart({
          where: {
            goodsUuid,
            ownerUuid: presentUserUuid,
          },
          changeField: {
            goodsNum,
            ...modifyInfo
          }
        })
      }else {
        return await app.model.Store.Goodscart.addCart({
            goodsUuid,
            ownerUuid: presentUserUuid,
            goodsNum,
            merchantUuid,
            ...crateInfo
        })
      }
    }
  };

  async checkGoodscart(params = {}) {
    let { app } = this;
    let { goodsUuid, presentUserUuid, presentUserName, isChecked } = params;
    const modifyInfo = app.getModifyInfo(presentUserUuid, presentUserName);
    return await app.model.Store.Goodscart.updateCart({
      changeField: {
        isChecked,
        ...modifyInfo
      },
      where: {
        goodsUuid,
        ownerUuid: presentUserUuid
      }
    })
  }

  async getGoodscart(params = {}) {
    let { app } = this;
    const { presentUserUuid: ownerUuid, merchantUuid } = params;
    return await app.model.Store.Goodscart.getGoodscart({
      ownerUuid,
      merchantUuid
    });
  }
}

module.exports = GoodscartService;
