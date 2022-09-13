import { Router } from 'express';

import {
  createCard,
  deleteCard,
  getAllCards,
  getCard
} from '../controllers/cardController';
import { ensureAuthenticatedMiddleware } from '../middlewares/authMiddleware';
import { validateSchemaMiddleware } from '../middlewares/schemaMiddleware';
import { cardSchema } from '../schemas/cardSchema';

const cardRouter = Router();

cardRouter.use(ensureAuthenticatedMiddleware);
cardRouter.get('/cards', getAllCards);
cardRouter.get('/cards/:id', getCard);
cardRouter.post('/cards', validateSchemaMiddleware(cardSchema), createCard);
cardRouter.delete('/cards/:id', deleteCard);

export default cardRouter;
