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


  dbGoodscategory.createGoodscategory = async params => {
    const result = await dbGoodscategory.create(params);
    return result.uuid;
  }

  dbGoodscategory.delGoodscategory = async params => {
    const result = await dbGoodscategory.destroy({ where: { ...params } });
    return result;
  }

  dbGoodscategory.updateGoodscategory = async params => {
    const { uuid, name, ownerUuid, modifyInfo } = params;
    const result = await dbGoodscategory.update({ name, ...modifyInfo }, { where: { uuid, ownerUuid } });
    return result;
  }

  dbGoodscategory.getGoodscategoryList = async params => {
    const { ownerUuid, attributes } = params;
    return await dbGoodscategory.findAll({
      attributes,
      where: { ownerUuid },
    });
  }

  dbGoodscategory.get = async params => {
    const { uuid, ownerUuid, attributes } = params;
    const result = await dbGoodscategory.findOne({
      where: {
        uuid,
        ownerUuid,
      },
      attributes
    });
    return result;
  }
  
  return dbGoodscategory;
};

