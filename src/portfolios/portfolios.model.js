import scheme from "../../database/scheme.js";
import {DataTypes} from "sequelize";
import {ImagesModel} from "../images/images.model.js";
import {UsersModel} from "../users/users.model.js";

export const PortfoliosModel = scheme.define('portfolios', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

PortfoliosModel.hasMany(ImagesModel)
ImagesModel.belongsTo(PortfoliosModel)

UsersModel.hasMany(PortfoliosModel)
PortfoliosModel.belongsTo(UsersModel)

UsersModel.hasMany(ImagesModel)
ImagesModel.belongsTo(UsersModel)