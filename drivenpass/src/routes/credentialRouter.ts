import { Router } from 'express';

import {
  createCredential,
  deleteCredential,
  getAllCredentials,
  getCredential
} from '../controllers/credentialController';
import { ensureAuthenticatedMiddleware } from '../middlewares/authMiddleware';
import { validateSchemaMiddleware } from '../middlewares/schemaMiddleware';
import { credentialSchema } from '../schemas/credentialSchema';

const credentialRouter = Router();

credentialRouter.use(ensureAuthenticatedMiddleware);
credentialRouter.get('/credentials', getAllCredentials);
credentialRouter.get('/credentials/:id', getCredential);
credentialRouter.post(
  '/credentials',
  validateSchemaMiddleware(credentialSchema),
  createCredential
);
credentialRouter.delete('/credentials/:id', deleteCredential);

export default credentialRouter;
