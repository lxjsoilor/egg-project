'use strict';

const Controller = require('../../core/base_controller');

/**
 * Controller - goods
 * @class
 * @author linxiongjun
 */
class AddressController extends Controller {
  async createAddree() {
    const { ctx, app } = this;
    const { address, linkMan, linkPhone } = ctx.request.body;
    if(app._.isEmpty(address)) {
      this.fail(300, '地址不能为空')
    }else if(app._.isEmpty(linkMan)) {
      this.fail(300, '联系人不能为空')
    }else if(app._.isEmpty(linkPhone)) {
      this.fail(300, '联系电话不能为空')
    }else{
      const { uuid } = await ctx.service.uac.address.createAddree(ctx.request.body);
      this.success(uuid);
    }
  }
  async queryAllAddress() {
    const { ctx } = this;
    const result = await ctx.service.uac.address.queryAllAddress(ctx.request.body);
    this.success(result);
  }
  async delAddress() {
    const { ctx } = this;
    await ctx.service.uac.address.delAddress(ctx.request.body);
    this.success('删除成功');
  }
  async updateAddress() {
    const { ctx } = this;
    await ctx.service.uac.address.updateAddress(ctx.request.body);
    this.success('修改成功')
  }
  async setDefaultAddress() {
    const { ctx } = this;
    await ctx.service.uac.address.setDefaultAddress(ctx.request.body);
    this.success('设置成功')
  }
}

module.exports = AddressController;
