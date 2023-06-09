import {ImagesModel} from "./images.model.js";
import fs from "fs";
import path from "path";
import * as uuid from 'uuid'
import {ApiErrors} from "../errors/errors.api.js";
import scheme from "../../database/scheme.js";
import {QueryTypes} from "sequelize";
import {CommentsModel} from "../comments/comments.model.js";
import {PortfoliosModel} from "../portfolios/portfolios.model.js";

class ImagesService {

    async getImage(options) {
        const image = await ImagesModel.findOne({where: options})
        return image
    }

    async saveImageInDirectory(image) {
        if (!fs.existsSync(path.resolve('images'))) {
            fs.mkdirSync(path.resolve('images'))
        }
        const uniqueName = uuid.v4() + '.jpg'
        await image.mv(path.resolve('images', uniqueName))
        return uniqueName
    }

    removeImageFromDirectory(imageUniqueName) {
        const pathToImage = path.resolve('images', imageUniqueName)
        if (fs.existsSync(pathToImage)) {
            fs.unlinkSync(pathToImage)
        }
    }

    async uploadImageToServer(user, image) {
        const uniqueName = await this.saveImageInDirectory(image)
        const imageDb = await ImagesModel.create({uniqueName, userId: user.id})
        return imageDb
    }

    async removeImageFromServer(user, imageId) {
        const image = await this.getImage({id: imageId, userId: user.id})
        if (!image) {
            throw ApiErrors.badRequest('The image doesn\'t exist')
        }
        await ImagesModel.destroy({where: {id: image.id}})
        this.removeImageFromDirectory(image.uniqueName)
    }

    async getImageFeed(page = 1, limit = 10) {
        const offset = limit * page - limit

        const images = await ImagesModel.findAll({
            offset,
            limit,
            include: [{model: PortfoliosModel, attributes: ['name']}],
            attributes: {exclude: ['updatedAt', 'portfolioId', 'userId']}
        })

        // const images = await scheme.query(`
        //     SELECT images.id as id, images."uniqueName" as images, images.description as description,
        //         portfolios.name as portfolioName, images."createdAt" as createdAt
        //     FROM images
        //     JOIN portfolios ON portfolios.id = images."portfolioId"
        //     OFFSET ?
        //     LIMIT ?
        // `, {
        //     raw: true,
        //     type: QueryTypes.SELECT,
        //     replacements: [offset, limit]
        // })
        return images
    }

    async getImages() {
        const images = await ImagesModel.findAll({include: [CommentsModel]})
        return images
    }

    async editSettings(imageId, data) {
        const image = await this.getImage({id: imageId})

        for (const dataKey in data) {
            if (data[dataKey]) {
                image[dataKey] = data[dataKey]
            }
        }
        image.save()

        return image
    }
}

export default new ImagesService()