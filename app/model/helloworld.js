'use strict';
const db = require('../../database/db.js');

module.exports = app => {
  const helloworldSchema = require('../schema/helloworld.js')(app);
  const Helloworld = db.defineModel(app, 'helloworld', helloworldSchema);

  /**
   * 新增商品
   * @param {object} goods - 条件
   * @return {string} - 类别uuid
   */
  Helloworld.test = async params => {
    console.log(params)
    const result = await Helloworld.create(params);
    return result;
  };

  return Helloworld;
};

