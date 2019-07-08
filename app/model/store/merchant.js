'use strict';
const db = require('../../../database/db');
const md5 = require('md5');
module.exports = app => {
  const merchantSchema = require('../../schema/merchant')(app);
  const Merchant = db.defineModel(app, 'merchant', merchantSchema, {
    timestamps: false,
    freezeTableName: true,
  });

  /**
   * 新增商品
   * @param {object} goods - 条件
   * @return {string} - 类别uuid
   */
  Merchant.getUserByUserNameAndPassword = async params => {
    
  };

  return Merchant;
};

