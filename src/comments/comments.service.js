import imagesService from "../images/images.service.js";
import {ApiErrors} from "../errors/errors.api.js";
import {CommentsModel} from "./comments.model.js";

class CommentsService {

    async writeComment(user, imageId, text) {
        const image = await imagesService.getImage({id: imageId})
        if (!image)
            throw ApiErrors.badRequest('The image doesn\'t exist')

        const comment = await CommentsModel.create({userId: user.id, imageId, text})

        return comment
    }

    async getComments(imageId) {
        const comments = await CommentsModel.findAll({where: {imageId}})
        return comments
    }
}

export default new CommentsService()