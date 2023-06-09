import authService from "./auth.service.js";
import {validationResult} from "express-validator";
import {ApiErrors} from "../errors/errors.api.js";

class AuthController {

    async signUp(req, res, next) {
        try {
            const validate = validationResult(req)
            if (!validate.isEmpty())
                throw ApiErrors.badRequest(validate.array())

            const {username, password} = req.body
            const user = await authService.signUp(username, password)
            res.cookie('refreshToken', user.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

            return res.json({success: true, ...user})
        } catch(e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const validate = validationResult(req)
            if (!validate.isEmpty())
                throw ApiErrors.badRequest(validate.array())

            const {username, password} = req.body
            const user = await authService.login(username, password)
            res.cookie('refreshToken', user.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

            return res.json({success: true, ...user})
        } catch(e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            await authService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json({success: true, message: 'Logout successfully!'})
        } catch(e) {
            next(e)
        }
    }
}

export default new AuthController()