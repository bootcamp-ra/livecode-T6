import { CreateSafeNoteData } from '../services/safeNoteService';
import { prisma } from './../config/database';

export async function getAll(userId: number) {
  return prisma.safeNote.findMany({
    where: { userId }
  });
}

export async function getSafeNote(userId: number, safeNoteId: number) {
  return prisma.safeNote.findFirst({
    where: {
      userId,
      id: safeNoteId
    }
  });
}

export async function getSafeNoteByTitle(userId: number, title: string) {
  return prisma.safeNote.findFirst({
    where: { userId, title }
  });
}

export async function insertSafeNote(
  userId: number,
  safeNote: CreateSafeNoteData
) {
  return prisma.safeNote.create({
    data: { ...safeNote, userId }
  });
}

export async function deleteSafeNote(id: number) {
  return prisma.safeNote.delete({ where: { id } });
}
