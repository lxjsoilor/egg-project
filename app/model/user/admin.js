'use strict';
const db = require('../../database/db');

module.exports = app => {
  const adminSchema = require('../../schema/admin')(app);
  const Admin = db.defineModel(app, 'admin', adminSchema);

  /**
   * 查找管理员
   * @param {object} { uuid, attributes } - 条件
   * @return {object|null} - 查找结果
   */
  Admin.login = async (condition) => {
    return await Admin.findOne({
        where: condition
    })
  };

  /**
   * 修改商家密码
   * @param {object} params - 条件
   * @return {string} - 商家uuid
   */
  Admin.savePasswordModify = async params => {
    const { uuid, oldPassword, password, lastModifierId, lastModifierName } = params;
    const updateField = { password, lastModifierId, lastModifierName };
    const result = await Admin.update(updateField, { where: { uuid, password: oldPassword } });

    app.checkUpdate(result, '旧密码不正确');

    return uuid;
  };

  return Admin;
};

