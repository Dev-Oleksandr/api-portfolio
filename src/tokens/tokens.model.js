import scheme from "../../database/scheme.js";
import {DataTypes} from "sequelize";
import {UsersModel} from "../users/users.model.js";

export const TokensModel = scheme.define('tokens', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    refreshToken: {
        type: DataTypes.STRING(535)
    },
})

UsersModel.hasOne(TokensModel, {onDelete: 'CASCADE'})
TokensModel.belongsTo(UsersModel, {onDelete: 'CASCADE'})
