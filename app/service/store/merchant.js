'use strict';
const md5 = require('md5');
const Service = require('egg').Service;
class HelloworldService extends Service {
  /**
   * 新增商品
   * @param {object} params - 条件
   * @return {string} - 商品uuid
   */
  async createMerchant(params = {}) {
    const { app } = this;
    const crateInfo = app.getCrateInfo('system', 'system');
    return await app.model.Store.Merchant.createMerchant({
      ...crateInfo,
      ...params
    });
  };

  async relevanceUser(params = {}) {
    const { app } = this;
    // 判断该用户是否存在并且是商家用户
    const { uuid, userName } = params;
    const isMerchantUser = await app.model.Uac.Auth.getUserByUserName({
      userName
    });
    const merchantInfo = await app.model.Store.Merchant.getMerchantByUuid({
      uuid
    });
    const merchantUuid = '1001';
    if(app._.isEmpty(isMerchantUser)) {
      throw new Error('该用户不存在')
    }else if(app._.isEmpty(merchantInfo)) {
      throw new Error('该店铺不存在')
    }else {
      console.log(isMerchantUser);
      let flag = false;
      isMerchantUser.dbUser_Roles.forEach(item => {
        if(item.roleUuid === merchantUuid) {
          flag = true;
        }
      });
      if(flag) {
        return await app.model.Store.Merchant.relevanceUser({
          uuid,
          userInfo: {
            uuid: isMerchantUser.uuid,
            userName
          }
        })
      }else {
        throw new Error('该用户不是商家角色');
      }
    }
  };

  async updateMerchant(params = {}) {
    const { app } = this;
    return await app.model.Store.Merchant.updateMerchant({
      ...params
    })
  }
}

module.exports = HelloworldService;
