'use strict';
const md5 = require('md5');
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
      const uuid = await app.model.Uac.Auth.createUser({
          ...params,
          ...crateInfo
      });
      if(!app._.isEmpty(uuid)) {
        await app.model.Uac.Auth.crateUserMapRole({
            ...crateInfo,
            userUuid: uuid,
            roleUuid: '1002',
            roleName: '普通用户',
            roleTypeId: 3
        });
        return uuid;
      }else {
        return null;
      }
  };
  async updateRoleByUserUuid(params = {}) {
    const { app } = this;
    let { roleTypeIdArr, userUuid } = params;
    if(roleTypeIdArr.indexOf('1000') >= 0) {
      roleTypeIdArr.splice(roleTypeIdArr.indexOf('1000'), 1);
    }
    if(roleTypeIdArr.indexOf('1002') < 0) {
      roleTypeIdArr.push('1002')
    }
    // 检查该用户是否存在
    const userCount = await app.model.Uac.Auth.getUserCount({ uuid: userUuid });
    if(userCount <=0 ) {
      throw new Error('该用户不存在')
    }else {
      const crateInfo = app.getCrateInfo('system', 'system');
      return await app.model.Uac.Auth.updateRoleByUserUuid({
        userUuid,
        roleTypeIdArr,
        crateInfo
      })
    }
  };

  async addRole(params) {
    const { app } = this;
    const crateInfo = app.getCrateInfo('system', 'system');
    return await app.model.Uac.Auth.addRole({
      ...params,
      ...crateInfo
    });
  };

  async delRoleByUuid(params) {
    const { app } = this;
    const userCount = await app.model.Uac.Auth.getRoleCountAtUser({ roleUuid: params.uuid });
    if(userCount > 0) {
      throw new Error('该角色有绑定的用户，不能删除');
    }else {
      return await app.model.Uac.Auth.delRoleByUuid({
        ...params
      })
    }
  };

  async updateRoleByUuid(params) {
    const { app } = this;
    // const roleCount = await app.model.Uac.Auth.getRoleCount({
    //   roleName: params.roleName,
    //   uuid: params.uuid
    // });
    // if(roleCount > 0 ) {
    //   throw new Error('该角色名称已经存在');
    // }

    return await app.model.Uac.Auth.updateRoleByUuid({
      ...params
    })
  };

  async queryAllRole(params={}) {
    const { app } = this;
    return await app.model.Uac.Auth.queryAllRole({})
  };

  async queryUserByCondition(params={}) {
    const { app } = this;
    return await app.model.Uac.Auth.queryUserByCondition({
      ...params,
      attributes: ['uuid', 'name', 'userName', 'userType']
    });
  };

  async delUserByUuid(params = {}) {
    const { app } = this;
    const result = await app.model.Uac.Auth.delUserByUuid({
      ...params
    });
    if(result <= 0) {
      return result;
    }else {
      // 同时要删除关系表
      const result2 = await app.model.Uac.Auth.delUserRoleByUuid({
        userUuid: params.uuid
      });
      return result;
    }
  };

  async updateUserByUuid(params = {}) {
    const { app } = this;
    const result = await app.model.Uac.Auth.updateUserByUuid({
      ...params
    });
    return result;
  };

  async updateUserPasswordByUuid(params = {}) {
    const { app } = this;
    const { newPassword, oldPassword, uuid } = params;
    // 判断原本的密码是否正确
    const oldPasswordResult = await app.model.Uac.Auth.checkUserPassword({
      password: md5(oldPassword),
      uuid
    });
    if(app._.isEmpty(oldPasswordResult)) {
      throw new Error('旧密码错误')
    }else {
      // 更改密码
      const result = await app.model.Uac.Auth.updateUserByUuid({
        uuid,
        updateInfo: {
          password: md5(newPassword)
        }
      })
      return result;
    }
  }
}

module.exports = HelloworldService;
