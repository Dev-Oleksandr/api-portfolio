import portfoliosService from "./portfolios.service.js";

class PortfoliosController {

    async createPortfolio(req, res, next) {
        try {
            const {name, description} = req.body
            const {user} = req
            const portfolio = await portfoliosService.createPortfolio(user.id, name, description)
            return res.json({success: true, portfolio})
        } catch(e) {
            next(e)
        }
    }

    async uploadImageToPortfolio(req, res, next) {
        try {
            const {imageId, portfolioId} = req.query
            const image = await portfoliosService.uploadImageToPortfolio(imageId, portfolioId)
            return res.json({success: true, image})
        } catch(e) {
            next(e)
        }
    }

    async removePortfolio(req, res, next) {
        try {
            const {portfolioId} = req.params
            const {user} = req
            await portfoliosService.removePortfolio(user, portfolioId)
            return res.json({success: true})
        } catch(e) {
            next(e)
        }
    }

    async getPortfolios(req, res, next) {
        try {
            const portfolios = await portfoliosService.getPortfolios()
            return res.json({success: true, portfolios})
        } catch(e) {
            next(e)
        }
    }
}

export default new PortfoliosController()