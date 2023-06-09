import usersService from "./users.service.js";

class UsersController {

    async removeProfile(req, res, next) {
        try {
            const {user} = req
            await usersService.removeProfile(user)
            return res.json({success: true})
        } catch(e) {
            next(e)
        }
    }

}

export default new UsersController()