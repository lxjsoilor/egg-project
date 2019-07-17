'use strict';
const db = require('../../../database/db');
module.exports = app => {
  const dbGoodsCartgorySchema = require('../../schema/dbGoodsCart')(app);
  const dbGoodscart = db.defineModel(app, 'dbGoodscart', dbGoodsCartgorySchema, {
    timestamps: false,
    freezeTableName: true,
  });
  const dbGoodsSchema = require('../../schema/dbGoods')(app);
  const dbGoods = db.defineModel(app, 'dbGoods', dbGoodsSchema, {
    timestamps: false,
    freezeTableName: true,
  });

  dbGoodscart.belongsTo(dbGoods, { foreignKey: 'goodsUuid' });
  
  dbGoodscart.delCart = async params => {
    return await dbGoodscart.destroy({
      where: {
        ...params
      }
    })
  } 

  dbGoodscart.updateCart = async params => {
    const { where, changeField } = params;
    console.log(where)
    return await dbGoodscart.update({
      ...changeField
    }, { where });
  }

  dbGoodscart.addCart = async params => {
    return await dbGoodscart.create(params);
  }

  dbGoodscart.goodsCartCount = async params => {
    return await dbGoodscart.count({
      where: params
    })
  }

  dbGoodscart.getGoodscart = async params => {
    let { ownerUuid, merchantUuid } = params;
    return await dbGoodscart.findAll({
      where: {
        ownerUuid,
        merchantUuid
      },
      attributes: ['uuid', 'goodsNum', 'isChecked', 'ownerUuid'],
      include: [{
        model: dbGoods,
        attributes: ['uuid', 'name', 'categoryName', 'unitName', 'salePrice', 'standard']
      }]
    })
  }


  return dbGoodscart;
};

