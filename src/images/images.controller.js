import imagesService from "./images.service.js";

class ImagesController {

    async uploadImage(req, res, next) {
        try {
            const {image} = req.files
            const {user} = req
            const imageDb = await imagesService.uploadImageToServer(user, image)
            return res.json({success: true, image: imageDb})
        } catch (e) {
            next(e)
        }
    }

    async removeImage(req, res, next) {
        try {
            const {imageId} = req.params
            const {user} = req
            await imagesService.removeImageFromServer(user, imageId)
            return res.json({success: true})
        } catch (e) {
            next(e)
        }
    }

    async getImageFeed(req, res, next) {
        try {
            const {page, limit} = req.query
            const feed = await imagesService.getImageFeed(page, limit)
            return res.json({success: true, feed})
        } catch (e) {
            next(e)
        }
    }

    async getImages(req, res, next) {
        try {
            const images = await imagesService.getImages()
            return res.json({success: true, images})
        } catch(e) {
            next(e)
        }
    }

    async editSettings(req, res, next) {
        try {
            const {imageId} = req.params
            const {name, description} = req.body
            const image = await imagesService.editSettings(imageId, {name, description})
            return res.json({success: true, image})
        } catch(e) {
            next(e)
        }
    }
}

export default new ImagesController()