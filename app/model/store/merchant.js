'use strict';
const db = require('../../../database/db');
const md5 = require('md5');
module.exports = app => {
  const merchantSchema = require('../../schema/merchant')(app);
  const dbUserSchema = require('../../schema/dbUser')(app);
  const dbUser = db.defineModel(app, 'dbUser', dbUserSchema, {
    timestamps: false,
    freezeTableName: true,
  });
  const Merchant = db.defineModel(app, 'merchant', merchantSchema, {
    timestamps: false,
    freezeTableName: true,
  });


  Merchant.createMerchant = async params => {
    const result = await Merchant.create({
      ...params
    })
    return result;
  };
  
  Merchant.relevanceUser = async params => {
    const { uuid, userInfo } = params;
    const transaction = await app.transition();
    await Merchant.update({
      owner: userInfo.uuid
    }, {
      where: {
        uuid
      },
      transaction
    });
    await dbUser.update({
      storeUuid: uuid
    }, {
      where: {
        uuid: userInfo.uuid
      },
      transaction
    });
    return uuid;
  };

  Merchant.getMerchantByUuid = async params => {
    const result = await Merchant.findOne({
      where: {
        ...params
      }
    });
    return result;
  }



  return Merchant;
};

