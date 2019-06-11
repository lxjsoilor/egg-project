const Service = require('egg').Service;

class GoodsCategoryService extends Service {
    async saveNew(params = {}) {
        let { goodsCategory } = params;
        console.log(goodsCategory);
        return await this.app.model.GoodsCategory.saveNew({
            ...goodsCategory
        })
    }
}

module.exports = GoodsCategoryService;