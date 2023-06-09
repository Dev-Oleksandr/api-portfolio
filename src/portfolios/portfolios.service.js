import {PortfoliosModel} from "./portfolios.model.js";
import {ApiErrors} from "../errors/errors.api.js";
import imagesService from "../images/images.service.js";

class PortfoliosService {

    async createPortfolio(userId, name, description) {
        const portfolio = await PortfoliosModel.create({userId, name, description})
        return portfolio
    }

    async getPortfolio(options) {
        const portfolio = await PortfoliosModel.findOne({where: options})
        return portfolio
    }

    async uploadImageToPortfolio(imageId, portfolioId) {
        const portfolio = await this.getPortfolio({id: portfolioId})
        if (!portfolio)
            throw ApiErrors.badRequest('The portfolio doesn\'t exist')

        const imageDb = await imagesService.getImage({id: imageId, portfolioId: null})
        if (!imageDb)
            throw ApiErrors.badRequest('The image doesn\'t exist')

        imageDb.portfolioId = portfolio.id
        await imageDb.save()
        return imageDb
    }

    async removePortfolio(user, portfolioId) {
        const portfolio = await this.getPortfolio({id: portfolioId, userId: user.id})
        if (!portfolio)
            throw ApiErrors.badRequest('You aren\'t the creator of this portfolio.')

        await PortfoliosModel.destroy({where: {id: portfolio.id}})
    }

    async getPortfolios() {
        const portfolios = await PortfoliosModel.findAll()
        return portfolios
    }
}

export default new PortfoliosService()