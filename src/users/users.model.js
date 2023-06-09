import scheme from "../../database/scheme.js";
import {DataTypes} from "sequelize";

export const UsersModel = scheme.define('users', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    username: {type: DataTypes.STRING, allowNull: false, unique: true},
    password: {type: DataTypes.STRING, allowNull: false},
})