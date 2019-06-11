const _ = require('lodash');

function myDefineModel(app, name, attributes, attributes1) {
    const attrs = {};

    for (const key in attributes) {
        const value = attributes[key];
        if (_.isObject(value) && value.type) {
            value.allowNull = value.allowNull && true;
            attrs[key] = value;
        } else {
            attrs[key] = {
                type: value,
                allowNull: true,
            };
        }
    }

    return app.model.define(name, attrs, attributes1);
}
module.exports = app => {
    const { STRING, BIGINT, DATE, UUIDV1 } = app.Sequelize;
    const GoodsCategory = myDefineModel(app, 'goodscategory', {
        uuid: {
            type: STRING(38),
            allowNull: false,
            primaryKey: true,
            defaultValue: UUIDV1,
        },
        lastModifierName: {
            type: STRING(76),
            allowNull: false,
        },
        lastModifiedTime: {
            type: DATE,
            allowNull: false,
        },
        lastModifierId: {
            type: STRING(38),
            allowNull: false,
        },
        createdTime: {
            type: DATE,
            allowNull: false,
        },
        creatorName: {
            type: STRING(76),
            allowNull: false,
        },
        creatorId: {
            type: STRING(38),
            allowNull: false,
        },
        name: {
            type: STRING(76),
            allowNull: false,
            unique: true,
        },
        orgUuid: {
            type: STRING(38),
            allowNull: false,
        },
        version: {
            type: BIGINT,
            defaultValue: 0,
        }
    }, {
        timestamps: true,
        freezeTableName: true,
        underscored: false,
        createdAt: 'createdTime',
        updatedAt: 'lastModifiedTime',
    })

    GoodsCategory.saveNew = async goodsCategory => {
        let where = {
            "uuid": "b2fa7ed0-85b0-11e9-8b0c-b5b36db0e2f3"
        }
        let test2 = await GoodsCategory.findOne({
            where
        })
        console.log(test2)
        return test2;
    }

    return GoodsCategory;
}