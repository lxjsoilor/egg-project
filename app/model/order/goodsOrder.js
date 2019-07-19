'use strict';
const db = require('../../../database/db');
const md5 = require('md5');
module.exports = app => {
  const dbGoodsOrderSchema = require('../../schema/dbGoodsOrder')(app);
  const dbGoodsOrderlinesSchema = require('../../schema/dbGoodsOrderlines')(app);
  const dbGoodsOrderlines = db.defineModel(app, 'dbGoodsOrderlines', dbGoodsOrderlinesSchema, {
    timestamps: false,
    freezeTableName: true,
  });
  const dbGoodsOrder = db.defineModel(app, 'dbGoodsOrder', dbGoodsOrderSchema, {
    timestamps: false,
    freezeTableName: true,
  });
  // dbGoodsOrder.hasMany(dbGoods, { sourceKey: 'categoryUuid'});
  // dbGoodsOrder.hasMany(dbGoods, { foreignKey: 'categoryUuid' })   


  dbGoodsOrder.createOrder = async params => {
    const { ownerUuid, merchantUuid, crateInfo, address, linkPhone, linkMan } = params;
    const transaction = await app.transition();
    // 获取该用户购物车里的商品
    let cartResult = await app.model.Store.Goodscart.getGoodscart({
      ownerUuid,
      merchantUuid
    });
    let goodsTotalQty = 0;
    let totalAmount = 0;
    let goodsOrderLines = [];
    if (cartResult.length <= 0) {
      throw new Error('购物车不能为空')
    } else {
      cartResult.forEach(item => {
        goodsTotalQty += item.goodsNum || 0;
        totalAmount += item.goodsNum * parseFloat(item.dbGood.salePrice || 0);
      })
      let goodsOrderResult = await dbGoodsOrder.create({
        address, linkPhone, linkMan, merchantUuid, ownerUuid, totalAmount, goodsTotalQty, status: 'initial',
        ...crateInfo
      }, { transaction })
      cartResult.forEach(item => {
        goodsOrderLines.push({
          ownerUuid,
          unitName: item.dbGood.unitName,
          goodsUuid: item.dbGood.uuid,
          name: item.dbGood.name,
          salePrice: parseFloat(item.dbGood.salePrice),
          goodsName: item.goodsNum,
          goodsName: item.goodsNum,
          goodsOrderUuid: goodsOrderResult.uuid,
          ...crateInfo
        })
      })

      await dbGoodsOrderlines.bulkCreate(goodsOrderLines, { transaction });
      await app.model.Store.Goodscart.delCart({
        ownerUuid, merchantUuid
      }, { transaction })
      // 同时删除购物车
      // console.log(goodsOrderResult, 1010);
      return goodsOrderResult.uuid
    }
  }

  return dbGoodsOrder;
};

