'use strict';
const db = require('../../../database/db');
module.exports = app => {
  const dbAddressSchema = require('../../schema/dbAddress')(app);
  const dbAddress = db.defineModel(app, 'dbAddress', dbAddressSchema, {
    timestamps: false,
    freezeTableName: true,
  });

  dbAddress.createAddree = async (params = {}) => {
    return await dbAddress.create({
      ...params
    })
  };

  dbAddress.defaultAddressCount = async (params = {}) => {
    return await dbAddress.count({
      where: params
    })
  };

  dbAddress.queryAll = async (params = {}) => {
    return await dbAddress.findAll({
      attributes: ['uuid', 'address', 'linkMan', 'linkPhone', 'sysDefault'],
      where: params
    })
  };

  dbAddress.delAddress = async (params = {}) => {
    const result = await dbAddress.destroy({
      where: params
    })
    app.checkDelete(result);
    return result;    
  };

  dbAddress.updateAddress = async (params = {}) => {
    const { ownerUuid, uuid, address, linkMan, linkPhone, modifyInfo } = params;
    const result = await dbAddress.update({
      address, linkMan, linkPhone, ...modifyInfo
    }, {
      where: {
        ownerUuid,
        uuid
      }
    });
    app.checkUpdate(result);
    return result;
  };

  dbAddress.setDefaultAddress = async (params = {}) =>{
    const { uuid, ownerUuid } = params;
    const transaction = await app.transition();
    await dbAddress.update({ sysDefault: 0 }, { where: { sysDefault: 1, ownerUuid }, transaction });
    await dbAddress.update({ uuid, sysDefault: 1 }, { where: { uuid, ownerUuid }, transaction });
    return uuid;
  }

  return dbAddress;
};

