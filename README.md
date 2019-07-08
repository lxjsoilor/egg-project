# app-server

## 概述

本文档只介绍 **windows** 环境下如何本地调试和（待定）环境下服务器部署，关于eggjs的介绍如需进一步了解，参见 [egg官网][egg]。

##### 开发环境、工具

- **Node.js：** v10.15.0 （>= v8.0.0）

- **Mysql：** v5.5.51

- **Redis：** v3.2.0  需要打开配置：notify-keyspace-events Ex

## 本地开发（windows）

1、安装Node.js：[Node.js安装配置](https://www.runoob.com/nodejs/nodejs-install-setup.html)

2、安装mysql： [mysql图文安装教程](https://www.cnblogs.com/whaben/articles/6687544.html) 

2、安装redis： [Redis安装](https://www.runoob.com/redis/redis-install.html) 

3、新建数据库，名称：`tsbeer_db`，配置默认写的是我本地数据库的名称和密码，如需要自行修改 `app-server -> config -> config.default.js` 和 `app-server -> database -> config.json` 里面的配置，然后在app-server目录下运行 `npm run db:up`，就可以迁移数据库，初始化表和建了一个管理员账号。数据的迁移具体请看：[Sequelize](https://eggjs.org/zh-cn/tutorials/sequelize.html)

> 执行下面的命令，安装依赖
```bash
npm i
```

> 执行下面的命令，启动本地服务
```bash
npm run dev
```

> 执行下面的命令，启动本地调试（可断点）
```bash
npm run debug
```

## 部署

补充中...

```bash
$ npm start
$ npm stop
```
