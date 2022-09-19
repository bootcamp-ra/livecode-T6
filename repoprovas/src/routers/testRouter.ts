import { Router } from 'express';
import testController from '../controllers/testController';
import { ensureAuthenticatedMiddleware } from '../middlewares/ensureAuthenticatedMiddleware';

const testRouter = Router();

testRouter.get('/tests', ensureAuthenticatedMiddleware, testController.find);
testRouter.post('/tests', ensureAuthenticatedMiddleware, testController.insert);
testRouter.post(
  '/tests/:id/view',
  ensureAuthenticatedMiddleware,
  testController.view
);

export default testRouter;
