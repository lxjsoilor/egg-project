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

  return dbGoods;
};

