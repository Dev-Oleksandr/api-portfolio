import {UsersModel} from "./users.model.js";

class UsersService {

    async getUser(options) {
        const user = await UsersModel.findOne({where: options})
        return user
    }

    async createUser(values) {
        const user = await UsersModel.create(values)
        return user
    }

    async removeProfile(user) {
        await UsersModel.destroy({where: {id: user.id}})
    }
}

export default new UsersService()