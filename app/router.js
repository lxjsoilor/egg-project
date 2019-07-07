'use strict';

/**
 * 路由
 * @param {Egg.Application} app - 当前应用的实例
 * @author ruiyong-lee
 */
module.exports = app => {
  const { router, controller } = app;
  // const { weapp, user, utils, goodsOrder, goods, goodsCategory, freightPlan, deliveryTimeType } = controller;
  const { helloworld, uac } = controller;
  
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
  
};
