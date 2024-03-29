'use strict';

/**
 * 路由
 * @param {Egg.Application} app - 当前应用的实例
 * @author linxiongjun
 */
module.exports = app => {
  const { router, controller } = app;
  // const { weapp, user, utils, goodsOrder, goods, goodsCategory, freightPlan, deliveryTimeType } = controller;
  const { helloworld, uac, store, utils, order } = controller;
  
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

  // 门店新增商品分类
  router.post('/store/goodscategory/createGoodscategory', store.goodscategory.createGoodscategory);
  // 删除商品分类
  router.post('/store/goodscategory/delGoodscategory', store.goodscategory.delGoodscategory);
  // 更新商品分类
  router.post('/store/goodscategory/updateGoodscategory', store.goodscategory.updateGoodscategory);
  // 获取商品分类列表
  router.post('/store/goodscategory/getGoodscategoryList', store.goodscategory.getGoodscategoryList);
  
  // 新增商品
  router.post('/store/goods/createGoods', store.goods.createGoods);
  // 删除商品
  router.post('/store/goods/delGoods', store.goods.delGoods);
  // 分页获取商品
  router.post('/store/goods/queryGoodsByCondition', store.goods.queryGoodsByCondition);
  // 根据分类获取商品
  router.post('/store/goods/queryGoodsByCategory', store.goods.queryGoodsByCategory);
  // 更新商品
  router.post('/store/goods/updateGoods', store.goods.updateGoods);

  // 加入购物车
  router.post('/store/goodscart/createGoodscart', store.goodscart.createGoodscart);
  // 选择或者取消购物车商品
  router.post('/store/goodscart/checkGoodscart', store.goodscart.checkGoodscart);
  // 获取购物车列表
  router.post('/store/goodscart/getGoodscart', store.goodscart.getGoodscart);

  // 新建收货地址
  router.post('/uac/address/createAddree', uac.address.createAddree);
  // 获取当前用户的地址
  router.post('/uac/address/queryAllAddress', uac.address.queryAllAddress);
  // 删除当前地址
  router.post('/uac/address/delAddress', uac.address.delAddress);
  // 修改地址
  router.post('/uac/address/updateAddress', uac.address.updateAddress);
  // 设置默认地址
  router.post('/uac/address/setDefaultAddress', uac.address.setDefaultAddress);

  // 用户下单
  router.post('/order/goodsOrder/createOrder', order.goodsOrder.createOrder);
  // 取消订单
  router.post('/order/goodsOrder/cancelOrder', order.goodsOrder.cancelOrder);
  // 分页获取用户订单
  router.post('/order/goodsOrder/queryOrderByCondition', order.goodsOrder.queryOrderByCondition)
  // 接单
  router.post('/order/goodsOrder/auditedOrder', order.goodsOrder.auditedOrder)
  // 配送
  router.post('/order/goodsOrder/dispatchingOrder', order.goodsOrder.dispatchingOrder)
  // 已完成
  router.post('/order/goodsOrder/completedOrder', order.goodsOrder.completedOrder)
  // 自动取消
  router.post('/order/goodsOrder/autocanceledOrder', order.goodsOrder.autocanceledOrder)

  

  // 图片上传
  router.post('/utils/upload', utils.upload.upload);
  
};
