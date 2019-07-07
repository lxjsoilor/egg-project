'use strict';
const db = require('../../../database/db');
const md5 = require('md5');
module.exports = app => {
  const dbUserSchema = require('../../schema/dbUser')(app);
  const dbRoleSchema = require('../../schema/dbRole')(app);
  const dbUser_RoleSchema = require('../../schema/dbUser_Role')(app);
  const dbUser = db.defineModel(app, 'dbUser', dbUserSchema);
  const dbRole = db.defineModel(app, 'dbRole', dbRoleSchema);
  const dbUser_Role = db.defineModel(app, 'dbUser_Role', dbUser_RoleSchema);

  // 关系
  dbUser.hasMany(dbUser_Role, { foreignkey: 'userUuid' })   
  /**
   * 新增商品
   * @param {object} goods - 条件
   * @return {string} - 类别uuid
   */
  dbUser.getUserByUserNameAndPassword = async params => {
    console.log(params)
    const { userName, password } = params;
    
    const userResult = await dbUser.findOne({
        where: {
            userName,
            password: md5(password)
        }
    })
    if(userResult) {
        const roleResult = await dbUser_Role.findAll({
            attributes: [
                'roleUuid',
                'roleName',
                'roleTypeId'
            ],
            where: {
                userUuid: userResult.uuid
            }
        });
        userResult.roleList = JSON.stringify(roleResult);
        return userResult;
    }else {
        return userResult;
    }
  };

  dbUser.createUser = async (params, transaction=undefined) => {
    const result = await dbUser.create({
        ...params,
        password: md5(params.password)
    });
    return result.uuid;
  };

  dbUser.crateUserMapRole = async (params, transaction=undefined) => {
    const result = await dbUser_Role.create({
        ...params
    })
    return result;
  };

  dbUser.getRoleUuidByRoleTypeId = async params => {
      return await dbRole.findOne({
          where: {
              ...params
          }
      })
  };

  dbUser.updateRole = async params => {
    const { roleTypeIdArr, crateInfo } = params;
    const userUuid = 'cbcce230-a00a-11e9-9236-352bdf94d795';
    const result = await dbUser_Role.destroy({
        where: {
        userUuid: userUuid
        }
    })
    for(let i = 0; i < roleTypeIdArr.length; i++) {
        await dbUser_Role.create({
            ...crateInfo,
            userUuid,
            roleUuid: roleTypeIdArr[i],
            roleName: 'test',
            roleTypeId: '3'
        })
    }
    console.log(result)
    return result;
  }

  return dbUser;
};

