'use strict';
const db = require('../../../database/db');
const md5 = require('md5');
module.exports = app => {
  const dbUserSchema = require('../../schema/dbUser')(app);
  const dbRoleSchema = require('../../schema/dbRole')(app);
  const dbUser_RoleSchema = require('../../schema/dbUser_Role')(app);
  const dbUser = db.defineModel(app, 'dbUser', dbUserSchema, {
    timestamps: false,
    freezeTableName: true,
  });
  const dbRole = db.defineModel(app, 'dbRole', dbRoleSchema);
  const dbUser_Role = db.defineModel(app, 'dbUser_Role', dbUser_RoleSchema, {
    timestamps: false,
    freezeTableName: true,
  });

  // 关系
  dbUser.hasMany(dbUser_Role, { foreignKey: 'userUuid' })   
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

  dbUser.updateRoleByUserUuid = async params => {
    const { roleTypeIdArr, crateInfo, userUuid } = params;
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

  dbUser.getUserCount = async params => {
    const result = await dbUser.count({
      where: {
        ...params
      }
    });
    return result;
  }

  dbUser.addRole = async params => {
    const result = await dbRole.create({
      ...params
    });
    return {
      uuid: result.uuid || 0,
      roleTypeId: result.roleTypeId || 0
    }
  }

  dbUser.delRoleByUuid = async params => {
    const result = await dbRole.destroy({
      where: {
        ...params
      }
    });
    return result;
  }

  dbUser.delUserRoleByUuid = async params => {
    const result = await dbUser_Role.destroy({
      where: {
        ...params
      }
    });
    return result;
  }

  dbUser.getRoleCountAtUser = async params => {
    const result = await dbUser_Role.count({
      where: {
        ...params
      }
    });
    return result;
  }

  dbUser.updateRoleByUuid = async params => {
    const { roleName, uuid } = params;
    const result = await dbRole.update({
      roleName
    }, {
      where: {
        uuid
      }
    })
    return result;
  }

  dbUser.queryAllRole = async params => {
    const result = await dbRole.findAll({
      attributes: ['uuid', 'roleName', 'roleTypeId'],
      order: [['createdTime', 'DESC']]
    });
    console.log(result);
    return result;
  }

  dbUser.queryUserByCondition = async params => {
    const { pageNum, pageSize, attributes } = params;
    const condition = {
      offset: (pageNum - 1) * pageSize,
      limit: pageSize,
      attributes,
      include: [
        {
          model: dbUser_Role,
          foreignKey: 'userUuid',
          attributes: ['uuid', 'userUuid', 'roleUuid', 'roleName', 'roleTypeId']
        }
      ],
    };
    const result = await dbUser.findAndCountAll(condition);
    result.pages = Math.ceil(result.count/pageSize || 0);
    return result;
  }

  dbUser.delUserByUuid = async params => {
    const result = await dbUser.destroy({
      where: {
        ...params
      }
    })
    return result;
  }

  dbUser.updateUserByUuid = async params => {
    const { uuid, updateInfo } = params;
    const result = await dbUser.update({
      ...updateInfo
    }, {
      where: {
        uuid
      }
    });
    return result;
  }

  dbUser.checkUserPassword = async params => {
    const result = await dbUser.findOne({
      where: {
        ...params
      }
    })
    return result;
  }


  return dbUser;
};

