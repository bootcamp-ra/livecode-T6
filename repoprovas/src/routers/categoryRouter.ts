import { Router } from 'express';
import categoryController from '../controllers/categoryController';
import { ensureAuthenticatedMiddleware } from '../middlewares/ensureAuthenticatedMiddleware';

const categoryRouter = Router();

categoryRouter.get(
  '/categories',
  ensureAuthenticatedMiddleware,
  categoryController.findMany
);

export default categoryRouter;
