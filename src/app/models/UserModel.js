const moment = require('moment');


module.exports = (sequelize, DataTypes, Model) => {

    class UserModel extends Model {

    }

    UserModel.init({
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Email Id should be unique'
            },
            validate: {
                isEmail: {
                    msg: 'InValid email'
                },
            }
        },
        mobile: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            get() {
                return moment(this.dataValues.createdAt).format('DD/MM/yyyy hh:mm:ss:a');
            }
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            get() {
                return moment(this.dataValues.updatedAt).format('DD/MM/yyyy hh:mm:ss:a');
            }
        },
        isActive: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    }, {
        sequelize,
        timestamps: true,
        modelName: 'UserModel',
        tableName: 'user'
    });
    return UserModel;
};
