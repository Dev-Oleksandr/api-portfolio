import {Router} from "express";
import authRouter from "./auth/auth.router.js";
import portfoliosRouter from "./portfolios/portfolios.router.js";
import imagesRouter from "./images/images.router.js";
import commentsRouter from "./comments/comments.router.js";

const routes = new Router()

routes.use('/auth', authRouter)
routes.use('/portfolios', portfoliosRouter)
routes.use('/images', imagesRouter)
routes.use('/comments', commentsRouter)

export default routes