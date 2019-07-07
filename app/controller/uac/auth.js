'use strict';

const Controller = require('../../core/base_controller');

/**
 * Controller - goods
 * @class
 * @author ruiyong-lee
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
            })
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
  async updateRole2() {
    const { ctx, app } = this;
    const { roleTypeIdArr, userUuid } = ctx.request.body;
    if(app._.isEmpty(roleTypeIdArr)) {
        this.fail(300, '角色ID不能为空')
    }else {
        ctx.service.uac.auth.updateRole({
            userUuid,
            roleTypeIdArr
        });
    }
  }
}

module.exports = UacController;
