const Controller = require('../../core/base_controller');

class UserAdminController extends Controller {
    async login() {
        const { userName, password } = this.ctx.request.body;
        if(this.app._.isEmpty(userName)) {
            this.fail('用户名不能为空！')
        }else if(this.app._.isEmpty(password)) {
            this.fail('用户密码不能为空！')
        }else {
            const result = await this.ctx.service.user.admin.login({
                userName,
                password
            })
            if(this.app._.isEmpty(result)) {
                this.fail('用户名称或者密码错误！')
            }else {
                // this.ctx.setToken(result);
                await this.ctx.getToken();
                this.successData('登录成功！');
            }
        }
    }
}

module.exports = UserAdminController;