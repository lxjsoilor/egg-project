'use strict';

const Service = require('egg').Service;
class HelloworldService extends Service {
  /**
   * 新增商品
   * @param {object} params - 条件
   * @return {string} - 商品uuid
   */
  async login(params = {}) {
    const { app } = this;
    const { userName, password } = params;
    return await app.model.Uac.Auth.getUserByUserNameAndPassword({
        userName,
        password
    });
  };
  async register(params = {}) {
      const { app } = this;
      const crateInfo = app.getCrateInfo('system', 'system');
      const transaction = await app.transition();
      const uuid = await app.model.Uac.Auth.createUser({
          ...params,
          ...crateInfo
      }, transaction);
      if(!app._.isEmpty(uuid)) {
        await app.model.Uac.Auth.crateUserMapRole({
            ...crateInfo,
            userUuid: uuid,
            roleUuid: '1002',
            roleName: '普通用户',
            roleTypeId: 3
        }, transaction);
        return uuid;
      }else {
        return null;
      }
  };
  async updateRole(params = {}) {
    const { app } = this;
    let { roleTypeIdArr } = ctx.request.body;
    if(roleTypeIdArr.indexOf('1000') >= 0) {
        roleTypeIdArr.splice(roleTypeIdArr.indexOf('1000'), 1);
    }
    if(roleTypeIdArr.indexOf('1002') < 0) {
        roleTypeIdArr.push('1002')
    }
    const crateInfo = app.getCrateInfo('system', 'system');
    await app.model.Uac.Auth.updateRole({
        ...params,
        crateInfo
    })
  }
}

module.exports = HelloworldService;
