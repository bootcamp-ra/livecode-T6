import { Router } from 'express';
import teachersController from '../controllers/teachersController';
import { ensureAuthenticatedMiddleware } from '../middlewares/ensureAuthenticatedMiddleware';

const teacherRouter = Router();

teacherRouter.get(
  '/teachers/:discipline',
  ensureAuthenticatedMiddleware,
  teachersController.get
);

export default teacherRouter;
