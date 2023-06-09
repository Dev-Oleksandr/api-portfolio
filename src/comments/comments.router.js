import {Router} from "express";
import authMiddleware from "../auth/auth.middleware.js";
import CommentsController from "./comments.controller.js";

const commentsRouter = new Router()

commentsRouter.post('/write/:imageId', authMiddleware, CommentsController.writeComment) // +
commentsRouter.get('/:imageId', authMiddleware, CommentsController.getComments) // +

export default commentsRouter

