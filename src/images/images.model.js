import scheme from "../../database/scheme.js";
import {DataTypes} from "sequelize";

export const ImagesModel = scheme.define('images', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    uniqueName: {type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
})