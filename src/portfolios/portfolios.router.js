import {Router} from "express";
import PortfoliosController from "./portfolios.controller.js";
import authMiddleware from "../auth/auth.middleware.js";

const portfoliosRouter = new Router()

portfoliosRouter.post('/create', authMiddleware, PortfoliosController.createPortfolio)
portfoliosRouter.put('/image', authMiddleware, PortfoliosController.uploadImageToPortfolio)
portfoliosRouter.delete('/:portfolioId', authMiddleware, PortfoliosController.removePortfolio)
portfoliosRouter.get('/', authMiddleware, PortfoliosController.getPortfolios)

export default portfoliosRouter