import { Router } from 'express';
import {
  cadastrarTransaction,
  pegarTransacoes
} from '../controllers/transactionController.js';

import { userMiddleware } from '../middleware/userMiddleware.js';

const router = Router();

router.get('/transacoes', userMiddleware, pegarTransacoes);
router.post('/transacoes', userMiddleware, cadastrarTransaction);

export default router;
