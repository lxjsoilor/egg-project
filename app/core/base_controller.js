
const Controller = require('egg').Controller;

class BaseConroller extends Controller {
  successData(data, status) {
      this.ctx.body = {
          code: this.ctx.SUCCESS_CODE,
          data
      };
      this.ctx.status = status || 200;
  }
  successList(list, pagintion, status) {
      this.ctx.body = {
          code: this.ctx.SUCCESS_CODE,
          data: {
              ...pagintion,
              list
          }
      }
  }
  fail(messsage, code=999, data = {}) {
      this.ctx.body = {
          code,
          messsage,
          data,
      }
  }
}

module.exports = BaseConroller;
