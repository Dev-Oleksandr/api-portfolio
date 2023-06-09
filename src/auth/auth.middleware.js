import {ApiErrors} from "../errors/errors.api.js";
import tokensService from "../tokens/tokens.service.js";

export default function (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const bearer = req.headers.authorization.split(' ')[0]

        if (bearer !== 'Bearer' || !token) {
            return next(ApiErrors.forbidden('You must be logged in!'))
        }

        const validate = tokensService.validateToken(token, process.env.SECRET_ACCESS_TOKEN)
        if (!validate) {
            return next(ApiErrors.forbidden('You must be logged in !'))
        }

        req.user = validate
        next()
    } catch(e) {
        return next(ApiErrors.forbidden('You must be logged in !'))
    }
}