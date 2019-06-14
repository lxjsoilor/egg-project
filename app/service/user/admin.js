const Service = require('egg').Service;
const md5 = require('md5');
class UserAdminService extends Service {
    async login(params = {}) {
        let { userName, password } = params;
        let adminResult = this.app.model.User.Admin.login({ userName, password: md5(password) })
        return adminResult
    }
}

module.exports = UserAdminService;