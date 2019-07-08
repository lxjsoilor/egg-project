'use strict';

const Controller = require('../../core/base_controller');

/**
 * Controller - goods
 * @class
 * @author linxiongjun
 */
class UacController extends Controller {
  async login() {
    const { ctx } = this;
    const { userName, password } = ctx.request.body;
    if(this.app._.isEmpty(userName)) {
        this.fail(300, '用户名不能为空')
    }else if(this.app._.isEmpty(password)) {
        this.fail(300, '用户名不能为空')
    }else {
        const result = await ctx.service.uac.auth.login(ctx.request.body);
        console.log(result);
        if(this.app._.isEmpty(result)) {
            this.fail(300, '用户名或者密码不正确');
        }else {
            const { name, uuid, userName, userType, roleList } = result;
            ctx.setToken({
                name,
                userUuid: uuid,
                userName,
                userType,
                roleList
            });
            this.success('登陆成功')
        }
    }
  };
  async register() {
    const { ctx, app } = this;
    const { userName, password, confirmPassword, name } = ctx.request.body;
    try {
        if(app._.isEmpty(userName)) {
            this.fail(300, '用户名不能为空')
        }else if(app._.isEmpty(password)) {
            this.fail(300, '密码不能为空')
        }else if(app._.isEmpty(confirmPassword)) {
            this.fail(300, '确认密码不能为空')
        }else if(app._.isEmpty(name)) {
            this.fail(300, '姓名不能为空')
        }else {
            const result = await ctx.service.uac.auth.register({
                userName, password, confirmPassword, name,
                userType: 'other'
            });
            this.success(result);
        }
    }catch (err) {
        if(err.name === 'SequelizeUniqueConstraintError') {
            this.fail(300, `用户名已经存在`);
        }else {
            throw new Error(err);
        }
    }
  };
  async updateRoleByUserUuid() {
    const { ctx, app } = this;
    const { roleTypeIdArr, userUuid } = ctx.request.body;
    if(app._.isEmpty(roleTypeIdArr)) {
      this.fail(300, '角色ID不能为空')
    }else if(app._.isEmpty(userUuid)){
      this.fail(300, '用户ID不能为空')
    }else {
        const result = await ctx.service.uac.auth.updateRoleByUserUuid({
            userUuid,
            roleTypeIdArr
        });
        this.success(result);
    }
  };
  async addRole() {
    const { ctx, app } = this;
    const { roleName } = ctx.request.body;
    if(app._.isEmpty(roleName)) {
      this.fail('角色名称不能为空')
    }else {
      try {
        const result = await ctx.service.uac.auth.addRole({
          roleName
        });
        this.success(result);
      }catch (err) {
        if(err.name === 'SequelizeUniqueConstraintError') {
          this.fail(300, '角色名称已经存在');
        }else {
          throw new Error(err);
        }
      }
    }
  };
  async delRoleByUuid() {
    const { ctx, app } = this;
    const { uuid } = ctx.request.body;
    const defaultUuid = ['1000', '1001', '1002'];
    if(app._.isEmpty(uuid)) {
      this.fail(300, '角色UUID不能为空');
    }else if(defaultUuid.includes(uuid)) {
      this.fail(300, '系统默认角色无法删除');
    }else {
      const result = await ctx.service.uac.auth.delRoleByUuid({
        uuid
      })
      if(result > 0) {
        this.success('删除成功')
      }else {
        this.fail(300, '删除失败，请重试')
      }
    }
  };
  async updateRoleByUuid() {
    const { ctx, app } = this;
    const { uuid, roleName } = ctx.request.body;
    if(app._.isEmpty(uuid)) {
      this.fail(300, '角色UUID不能为空')
    }else {
      try {
        const result = await ctx.service.uac.auth.updateRoleByUuid({
          uuid,
          roleName
        });
        if(result > 0) {
          this.success('修改成功')
        }else {
          this.fail(300, '修改失败，请重试')
        }
      }catch (err) {
        if(err.name === 'SequelizeUniqueConstraintError') {
          this.fail(300, '角色名称已经存在');
        }else {
          throw new Error(err);
        }        
      }
    }
  };
  async queryAllRole() {
    const { ctx, app } = this;
    const result = await ctx.service.uac.auth.queryAllRole();
    this.success(result);
  };

  async queryUserByCondition() {
    const { ctx, app } = this;
    let { pageNum, pageSize } = ctx.request.body;
    pageNum = pageNum || 1;
    pageSize = pageSize || 10;
    const result = await ctx.service.uac.auth.queryUserByCondition({
      ...ctx.request.body,
      pageNum,
      pageSize
    })
    this.success(result);
  };


  async delUserByUuid() {
    const { ctx, app } = this;
    const { uuid } = ctx.request.body;
    if(app._.isEmpty(uuid + '')) {
      this.fail('用户UUID不能为空')
    }else {
      const result = await ctx.service.uac.auth.delUserByUuid({
        uuid
      });
      if(result <= 0) {
        this.fail('删除失败，请重试');
      }else {
        this.success('删除成功');
      }
    }
  };

  async updateUserByUuid() {
    const { ctx } = this;
    const { presentUserUuid, updateInfo } = ctx.request.body;
    await ctx.service.uac.auth.updateUserByUuid({
      updateInfo,
      uuid: presentUserUuid
    })
    this.success('更新成功')
  };

  async updateUserPasswordByUuid() {
    const { ctx, app } = this;
    const { presentUserUuid, oldPassword, newPassword } = ctx.request.body;
    if(app._.isEmpty(oldPassword)) {
      this.fail(300, '旧密码不能为空')
    }else if(app._.isEmpty(newPassword)) {
      this.fail(300, '新密码不能为空')
    }else if(newPassword == oldPassword){
      this.fail(300, '新的密码不能和旧的密码一样')
    }else {
      await ctx.service.uac.auth.updateUserPasswordByUuid({
        newPassword,
        oldPassword,
        uuid: presentUserUuid
      })
      this.success('密码修改成功');
    }
  }
  
  // async queryAllMerchantUser() {
  //   const { ctx, app } = this;
    
  // }
  
}

module.exports = UacController;
