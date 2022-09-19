import { Router } from 'express';
import disciplineController from '../controllers/disciplineController';
import { ensureAuthenticatedMiddleware } from '../middlewares/ensureAuthenticatedMiddleware';

const disciplineRouter = Router();

disciplineRouter.get(
  '/disciplines/:term',
  ensureAuthenticatedMiddleware,
  disciplineController.get
);

export default disciplineRouter;
