import usersService from "../users/users.service.js";
import {ApiErrors} from "../errors/errors.api.js";
import * as bcrypt from 'bcrypt'
import {UsersDto} from "../users/dto/users.dto.js";
import tokensService from "../tokens/tokens.service.js";

class AuthService {

    async signUp(username, password) {
        const existUser = await usersService.getUser({username})
        if (existUser) {
            throw ApiErrors.badRequest('The user have already exist')
        }

        const hashPassword = bcrypt.hashSync(password, 10)
        const user = await usersService.createUser({
            username, password: hashPassword
        })

        const userDto = new UsersDto(user)
        const {accessToken, refreshToken} = tokensService.generateJwtTokens({...userDto})
        await tokensService.saveToken(user.id, refreshToken)

        return {accessToken, refreshToken, user}
    }

    async login(username, password) {
        const existUser = await usersService.getUser({username})
        if (!existUser) {
            throw ApiErrors.badRequest('The user doesn\'t exist')
        }

        const comparePassword = bcrypt.compareSync(password, existUser.password)
        if (!comparePassword) {
            throw ApiErrors.badRequest('You have entered an incorrect password.')
        }

        const userDto = new UsersDto(existUser)

        const tokens = tokensService.generateJwtTokens({...userDto})

        return {...tokens, user: existUser}
    }

    async logout(refreshToken) {
        const tokenDb = await tokensService.getRefreshTokenDb(refreshToken)
        if (!tokenDb)
            throw ApiErrors.unAuthorized('You already logged out.')

        tokenDb.refreshToken = null
        await tokenDb.save()
    }
}

export default new AuthService()