import { SafeNote, User } from '@prisma/client';
import { conflictError, notFoundError } from '../utils/errorUtils';
import * as safeNoteRepository from './../repositories/safeNoteRepository';

export type CreateSafeNoteData = Omit<SafeNote, 'id'>;

async function getAllSafeNotes(userId: number) {
  const safeNotes = await safeNoteRepository.getAll(userId);
  return safeNotes;
}

async function getSafeNote(userId: number, safeNoteId: number) {
  const safeNote = await safeNoteRepository.getSafeNote(userId, safeNoteId);
  if (!safeNote) throw notFoundError("Safe note doesn't exist");

  return safeNote;
}

async function createSafeNote(user: User, safeNote: CreateSafeNoteData) {
  // title must be unique
  const existingCredential = await safeNoteRepository.getSafeNoteByTitle(
    user.id,
    safeNote.title
  );
  if (existingCredential) throw conflictError('Title already in use');

  await safeNoteRepository.insertSafeNote(user.id, safeNote);
}

async function deleteSafeNote(user: User, safeNoteId: number) {
  await getSafeNote(user.id, safeNoteId);
  await safeNoteRepository.deleteSafeNote(safeNoteId);
}

const safeNoteService = {
  getSafeNote,
  getAllSafeNotes,
  createSafeNote,
  deleteSafeNote
};

export default safeNoteService;
