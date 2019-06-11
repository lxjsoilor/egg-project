'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const { goodsCategory } = controller;

  router.get('/', controller.home.index);

  // 商品类别
  router.post('/goodsCategory/saveNew', goodsCategory.saveNew)
};
