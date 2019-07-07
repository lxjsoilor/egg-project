'use strict';

const Controller = require('../core/base_controller');

/**
 * Controller - goods
 * @class
 * @author ruiyong-lee
 */
class HelloworldController extends Controller {
  /**
   * 新增商品
   */
  async test() {
    const { ctx } = this;
    console.log(ctx.request.body);
    let params = {
        lastModifiedTime: new Date(),
        lastModifierName: 'test',
        lastModifierId: 'test',
        createdTime: new Date(),
        creatorName: 'test'
    }
    const result = await ctx.service.helloworld.test(params);
    this.success(result);
  }
}

module.exports = HelloworldController;
