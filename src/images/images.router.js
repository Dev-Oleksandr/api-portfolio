import {Router} from "express";
import authMiddleware from "../auth/auth.middleware.js";
import ImagesController from "./images.controller.js";

const imagesRouter = new Router()

imagesRouter.post('/upload', authMiddleware, ImagesController.uploadImage)
imagesRouter.delete('/:imageId', authMiddleware, ImagesController.removeImage)
imagesRouter.get('/feed', ImagesController.getImageFeed)
imagesRouter.get('/', authMiddleware, ImagesController.getImages)
imagesRouter.put('/settings/:imageId', authMiddleware, ImagesController.editSettings)

export default imagesRouter