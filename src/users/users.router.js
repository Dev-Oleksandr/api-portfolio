import {Router} from "express";
import UsersController from "./users.controller.js";
import authMiddleware from "../auth/auth.middleware";

const usersRouter = new Router()

usersRouter.delete('/', authMiddleware, UsersController.removeProfile)

export default usersRouter

