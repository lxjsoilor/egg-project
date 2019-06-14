'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const { goodsCategory, user } = controller;

  router.get('/', controller.home.index);

  // 商品类别
  router.post('/goodsCategory/saveNew', goodsCategory.saveNew)

  // 管理后台用户登录
  router.post('/user/login', user.admin.login)
};
