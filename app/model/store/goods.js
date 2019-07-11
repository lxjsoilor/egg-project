'use strict';
const db = require('../../../database/db');
const md5 = require('md5');
module.exports = app => {
  const dbGoodscategorySchema = require('../../schema/dbGoodscategory')(app);
  const dbGoodsSchema = require('../../schema/dbGoods')(app);
  const dbGoods = db.defineModel(app, 'dbGoods', dbGoodsSchema, {
    timestamps: false,
    freezeTableName: true,
  });
  const dbGoodscategory = db.defineModel(app, 'dbGoodscategory', dbGoodscategorySchema, {
    timestamps: false,
    freezeTableName: true,
  });
  // dbGoodscategory.hasMany(dbGoods, { sourceKey: 'categoryUuid'});
  dbGoodscategory.hasMany(dbGoods, { foreignKey: 'categoryUuid' })   


  dbGoods.createGoods = async params => {
    const result = await dbGoods.create(params);
    return result.uuid;
  }

  dbGoods.delGoods = async params => {
    const result = await dbGoods.destroy({
      where: {
        ...params
      }
    })
    app.checkDelete(result);
    return result;
  }

  dbGoods.queryGoodsByCondition = async params => {
    const { pageNum=1, pageSize=10, attributes=[] } = params;
    const condition = {
      offset: (pageNum - 1) * pageSize,
      limit: pageSize,
    }
    const result = await dbGoods.findAndCountAll(condition);
    result.pages = Math.ceil(result.count/pageSize || 0);
    return result;
  }

  dbGoods.queryGoodsByCategory = async params => {
    const { ownerUuid, categoryAttributes, goodsAttributes } = params;
    const result = await dbGoodscategory.findAll({
      attributes: categoryAttributes,
      where: { ownerUuid },
      include: [{
        model: dbGoods,
        attributes: goodsAttributes
      }]
    })
    return result;
  }

  dbGoods.updateGoods = async params => {
    const { ownerUuid, uuid, unitName, name, standard, material, packaging, expirationDate, spec, goodsInfo, salePrice, modifyInfo } = params;
    const result = await dbGoods.update({
      unitName, name, standard, material, packaging, expirationDate, spec, goodsInfo, salePrice, ...modifyInfo
    }, {
      where: {
        ownerUuid,
        uuid
      }
    });
    app.checkUpdate(result);
    return result;
  }

  return dbGoods;
};

