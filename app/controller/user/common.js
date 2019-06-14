const Controller = require('../../core/base_controller');

class UserCommonController extends Controller {
    async login() {
        console.log(this.ctx.request.body);
        const { username, password } = this.ctx.request.body;
        if(this.app._.isEmpty(username)) {
            this.fail('用户名不能为空！')
        }else if(this.app._.isEmpty(password)) {
            this.fail('用户密码不能为空！')
        }else {
            const result = await this.ctx.service.user.common.login({
                username,
                password
            })
            this.successData(result);
        }
    }
}

module.exports = UserCommonController;