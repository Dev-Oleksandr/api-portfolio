import {Router} from "express";
import AuthController from "./auth.controller.js";
import authMiddleware from "./auth.middleware.js";
import {body} from "express-validator";

const authRouter = new Router()

authRouter.post('/signup',
    body('password').isLength({min: 4, max: 20}),
    AuthController.signUp) // +
authRouter.post('/login',
    body('password').isLength({min: 4, max: 20}),
    AuthController.login) // +
authRouter.post('/logout', authMiddleware, AuthController.logout) // +

export default authRouter