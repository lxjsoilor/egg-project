'use strict';

/**
 * 路由
 * @param {Egg.Application} app - 当前应用的实例
 * @author linxiongjun
 */
module.exports = app => {
  const { router, controller } = app;
  // const { weapp, user, utils, goodsOrder, goods, goodsCategory, freightPlan, deliveryTimeType } = controller;
  const { helloworld, uac, store } = controller;
  
  router.post('/helloworld/test', helloworld.test);

  // 用户登录
  router.post('/uac/auth/login', uac.auth.login);
  // 用户注册
  router.post('/uac/auth/register', uac.auth.register);
  // 为指定用户添加角色
  router.post('/uac/auth/updateRoleByUserUuid', uac.auth.updateRoleByUserUuid);
  // 添加角色
  router.post('/uac/auth/addRole', uac.auth.addRole);
  // 删除角色
  router.post('/uac/auth/delRoleByUuid', uac.auth.delRoleByUuid);
  // 改角色
  router.post('/uac/auth/updateRoleByUuid', uac.auth.updateRoleByUuid);
  // 获取所有的角色
  router.post('/uac/auth/queryAllRole', uac.auth.queryAllRole);
  // 分页获取用户
  router.post('/uac/auth/queryUserByCondition', uac.auth.queryUserByCondition);
  // 根据uuid删除用户
  router.post('/uac/auth/delUserByUuid', uac.auth.delUserByUuid);
  // 根据uuid更新用户
  router.post('/uac/auth/updateUserByUuid', uac.auth.updateUserByUuid);
  // 修改用户密码
  router.post('/uac/auth/updateUserPasswordByUuid', uac.auth.updateUserPasswordByUuid);
  // 获取所有的商家用户
  // router.post('/uac/auth/queryAllMerchantUser', uac.auth.queryAllMerchantUser)

  // 新增门店
  router.post('/store/merchant/createMerchant', store.merchant.createMerchant);
  // 门店关联商家
  router.post('/store/merchant/relevanceUser', store.merchant.relevanceUser);
  // 编辑门店
  router.post('/store/merchant/updateMerchant', store.merchant.updateMerchant);
};
