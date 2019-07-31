'use strict';
const db = require('../../../database/db');
const md5 = require('md5');
module.exports = app => {
  const dbGoodsOrderSchema = require('../../schema/dbGoodsOrder')(app);
  const dbGoodsOrderlinesSchema = require('../../schema/dbGoodsOrderlines')(app);
  const merchantSchema = require('../../schema/merchant')(app);
  const dbGoodsOrderlines = db.defineModel(app, 'dbGoodsOrderlines', dbGoodsOrderlinesSchema, {
    timestamps: false,
    freezeTableName: true,
  });
  const dbGoodsOrder = db.defineModel(app, 'dbGoodsOrder', dbGoodsOrderSchema, {
    timestamps: false,
    freezeTableName: true,
  });
  const dbMerchant = db.defineModel(app, 'merchant', merchantSchema, {
    timestamps: false,
    freezeTableName: true,
  });
  // dbUser.hasMany(dbUser_Role, { foreignKey: 'userUuid' })
  // 关系
  // dbMerchant.hasMany(dbGoodsOrder, { foreignKey: 'merchantUuid' })
  dbGoodsOrder.hasMany(dbGoodsOrderlines, { foreignKey: 'goodsOrderUuid' })
  
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
      console.log(cartResult);
      cartResult.forEach(item => {
        goodsOrderLines.push({
          ownerUuid,
          unitName: item.dbGood.unitName,
          goodsUuid: item.dbGood.uuid,
          name: item.dbGood.name,
          salePrice: parseFloat(item.dbGood.salePrice),
          goodsName: item.goodsName,
          goodsNum: item.dbGood.goodsNum,
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
  };

  dbGoodsOrder.updateGoodsOrder = async params => {
    const { fieldChange, condition } = params;
    const result = await dbGoodsOrder.update({
      ...fieldChange
    }, {
        where: condition
      })
    app.checkUpdate(result);
  };

  dbGoodsOrder.query = async params => {
    const { attributes, filter = {}, sort = [], page, pageSize: limit, presentUserUuid: ownerUuid } = params;
    // const { page, pageSize: limit } = pagination;
    // const { keywordsLike, daterange, status } = filter;
    // const order = app.getSortInfo(sort);
    const condition = {
      offset: (page - 1) * limit,
      limit,
      // order,
      attributes,
      where: { ownerUuid },
      include: [{
        model: dbGoodsOrderlines,
        attributes: ['goodsName', 'salePrice', 'unitName', 'goodsUuid', 'goodsOrderUuid']
      }]
    };

    // if (openId) {
    //   condition.where.customerUuid = openId;
    // }

    // if (status) {
    //   condition.where.status = status;
    // }

    // if (keywordsLike) {
    //   condition.where.$or = [
    //     { billNumber: { $like: `%%${keywordsLike}%%` } },
    //     { customerName: { $like: `%%${keywordsLike}%%` } },
    //   ];
    // }

    // if (!app._.isEmpty(daterange)) {
    //   const startDate = new Date(daterange[0]);
    //   const endDate = new Date(daterange[1]);

    //   if (app._.isDate(startDate) && app._.isDate(endDate)) {
    //     condition.where.createdTime = {
    //       $gt: startDate,
    //       $lt: endDate,
    //     };
    //   }
    // }

    const { count, rows } = await dbGoodsOrder.findAndCountAll(condition);

    return { page, count, rows };
  }

  return dbGoodsOrder;
};

