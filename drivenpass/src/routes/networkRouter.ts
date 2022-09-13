import { Router } from 'express';

import {
  createNetwork,
  deleteNetwork,
  getAllNetworks,
  getNetwork
} from '../controllers/networkController';
import { ensureAuthenticatedMiddleware } from '../middlewares/authMiddleware';
import { validateSchemaMiddleware } from '../middlewares/schemaMiddleware';
import { networkSchema } from '../schemas/networkSchema';

const networkRouter = Router();

networkRouter.use(ensureAuthenticatedMiddleware);
networkRouter.get('/networks', getAllNetworks);
networkRouter.get('/networks/:id', getNetwork);
networkRouter.post(
  '/networks',
  validateSchemaMiddleware(networkSchema),
  createNetwork
);
networkRouter.delete('/networks/:id', deleteNetwork);

export default networkRouter;
