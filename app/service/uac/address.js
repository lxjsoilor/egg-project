'use strict';
const Service = require('egg').Service;
class AddressService extends Service {

  async createAddree(params = {}) {
    const { app } = this;
    const { address, linkMan, linkPhone, presentUserUuid, presentUserName } = params;
    const crateInfo = app.getCrateInfo(presentUserUuid, presentUserName);
    // 获取该用户的默认地址数量
    const defaultAddressCount = await app.model.Uac.Address.defaultAddressCount({
      ownerUuid: presentUserUuid,
      sysDefault: true
    })
    const addressParams = {
      address, linkMan, linkPhone,
      ownerUuid: presentUserUuid,
      ...crateInfo
    };
    if(defaultAddressCount <= 0) {
      addressParams.sysDefault = true
    }
    return await app.model.Uac.Address.createAddree(addressParams)
  };

  async queryAllAddress(params = {}) {
    const { app } = this;
    const { presentUserUuid: ownerUuid } = params;
    return await app.model.Uac.Address.queryAll({ ownerUuid })
  };

  async delAddress(params = {}) {
    const { app } = this;
    const { presentUserUuid: ownerUuid, uuid } = params;
    const isDefaultAddress = await app.model.Uac.Address.defaultAddressCount({
      ownerUuid,
      sysDefault: true,
      uuid
    })
    if(isDefaultAddress > 0) {
      throw new Error('不能删除默认的地址')
    }else {
      await app.model.Uac.Address.delAddress({
        ownerUuid,uuid
      })
    }
  };

  async updateAddress(params = {}) {
    const { app } = this;
    const { presentUserUuid: ownerUuid, uuid, address, linkMan, linkPhone, presentUserName } = params;
    const modifyInfo = app.getModifyInfo(ownerUuid, presentUserName);

    return await app.model.Uac.Address.updateAddress({
      ownerUuid,
      uuid,
      address,
      linkMan,
      linkPhone,
      modifyInfo
    })
  };

  async setDefaultAddress(params = {}) {
    const { app } = this;
    const { presentUserUuid: ownerUuid, uuid } = params;
    return await app.model.Uac.Address.setDefaultAddress({
      ownerUuid,
      uuid
    })
  }
}

module.exports = AddressService;
