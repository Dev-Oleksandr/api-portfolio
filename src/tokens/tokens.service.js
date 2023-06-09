import jwt from "jsonwebtoken";
import {TokensModel} from "./tokens.model.js";
import {ApiErrors} from "../errors/errors.api.js";

class TokensService {
    generateJwtTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.SECRET_ACCESS_TOKEN, {expiresIn: '30d'})
        const refreshToken = jwt.sign(payload, process.env.SECRET_REFRESH_TOKEN, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const user = await TokensModel.findOne({where: {userId}})
        if (!user) {
            const result = await TokensModel.create({userId, refreshToken})
            return result
        }
        if (refreshToken)
            user.refreshToken = refreshToken
        await user.save()
    }

    async getRefreshTokenDb(refreshToken) {
        const tokenDb = await TokensModel.findOne({where: {refreshToken}})
        return tokenDb
    }

    validateToken(token, secret) {
        return jwt.verify(token, secret)
    }
}

export default new TokensService