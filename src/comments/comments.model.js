import scheme from "../../database/scheme.js";
import {DataTypes} from "sequelize";
import {UsersModel} from "../users/users.model.js";
import {ImagesModel} from "../images/images.model.js";

export const CommentsModel = scheme.define('comments', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    text: {type: DataTypes.STRING, allowNull: false}
})

UsersModel.hasMany(CommentsModel, {onDelete: 'CASCADE'})
CommentsModel.belongsTo(UsersModel, {onDelete: 'CASCADE'})

ImagesModel.hasMany(CommentsModel, {onDelete: 'CASCADE'})
CommentsModel.belongsTo(ImagesModel, {onDelete: 'CASCADE'})
// UsersModel.belongsToMany(ImagesModel, {through: CommentsModel, onDelete: 'CASCADE'})
// ImagesModel.belongsToMany(UsersModel, {through: CommentsModel, onDelete: 'CASCADE'})