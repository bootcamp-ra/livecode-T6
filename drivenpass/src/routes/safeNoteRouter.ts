import { Router } from 'express';

import {
  createSafeNote,
  deleteSafeNote,
  getAllSafeNotes,
  getSafeNote
} from '../controllers/safeNoteController';
import { ensureAuthenticatedMiddleware } from '../middlewares/authMiddleware';
import { validateSchemaMiddleware } from '../middlewares/schemaMiddleware';
import { safeNoteSchema } from '../schemas/safeNoteSchema';

const safeNoteRouter = Router();

safeNoteRouter.use(ensureAuthenticatedMiddleware);
safeNoteRouter.get('/safenotes', getAllSafeNotes);
safeNoteRouter.get('/safenotes/:id', getSafeNote);
safeNoteRouter.post(
  '/safenotes/',
  validateSchemaMiddleware(safeNoteSchema),
  createSafeNote
);
safeNoteRouter.delete('/safenotes/:id', deleteSafeNote);

export default safeNoteRouter;
