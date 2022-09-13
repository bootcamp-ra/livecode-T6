import { Router } from 'express';
import authRouter from './authRouter';
import cardRouter from './cardRouter';
import credentialRouter from './credentialRouter';
import networkRouter from './networkRouter';
import safeNoteRouter from './safeNoteRouter';

const router = Router();

router.use(authRouter);
router.use(credentialRouter);
router.use(safeNoteRouter);
router.use(cardRouter);
router.use(networkRouter);

export default router;
