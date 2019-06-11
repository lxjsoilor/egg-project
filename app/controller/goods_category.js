const Controller = require('../core/base_controller');

class GoodsCategoryController extends Controller {
    async saveNew() {
        let test = await this.ctx.service.goodsCategory.saveNew(this.ctx.request.body);
        // let token = this.app.jwt.sign({
        //         foo: 'bar'
        //     }, this.app.config.jwt.secret);
        // console.log(token)

        // jwt测试
        let cookieConfig = {
            maxAge: 1000 * 3600,
            httpOnly: false,
            overwrite: true,
            signed: false
        }
        // this.ctx.cookies.set("token", token, cookieConfig);
        // let token2 = this.ctx.cookies.get('token', { signed: false });
        // let payload = await this.app.jwt.verify(token2, this.app.config.jwt.secret);

        // session测试
        // this.ctx.session.visited = this.ctx.session.visited ? (this.ctx.session.visited + 1) : 1;
        // this.ctx.session.user = {
        //     name: '刘小姐',
        //     paw: '123456'
        // }
        // console.log(this.ctx.session)

        // await this.app.redis.get('default').set('name', 'fdsfd');
        test = await this.app.redis.get('default').get('name');
        this.successData(test);
    }
}

module.exports = GoodsCategoryController;