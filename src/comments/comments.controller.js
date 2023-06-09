import commentsService from "./comments.service.js";

class CommentsController {

    async writeComment(req, res, next) {
        try {
            const {imageId} = req.params
            const {text} = req.body
            const {user} = req
            const comment = await commentsService.writeComment(user, imageId, text)
            return res.json({success: true, comment})
        } catch(e) {
            next(e)
        }
    }

    async getComments(req, res, next) {
        try {
            const {imageId} = req.params
            const comments = await commentsService.getComments(imageId)
            return res.json({success: true, comments})
        } catch(e) {
            next(e)
        }
    }
}

export default new CommentsController()