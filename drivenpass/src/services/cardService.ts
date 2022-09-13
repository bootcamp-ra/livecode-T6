import { Card, User } from '@prisma/client';

import { decrypt, encrypt } from '../utils/criptrUtils';
import { conflictError, notFoundError } from '../utils/errorUtils';
import * as cardRepository from './../repositories/cardRepository';

export type CreateCardData = Omit<Card, 'id'>;

async function getAll(userId: number) {
  const cards = await cardRepository.getAll(userId);
  return cards.map(card => {
    return {
      ...card,
      password: decrypt(card.password),
      securityCode: decrypt(card.securityCode)
    };
  });
}

export async function getCard(userId: number, cardId: number) {
  const card = await cardRepository.getCard(userId, cardId);
  if (!card) throw notFoundError("Card doesn't exist");

  return {
    ...card,
    password: decrypt(card.password),
    securityCode: decrypt(card.securityCode)
  };
}

async function createCard(user: User, card: CreateCardData) {
  // title must be unique
  const existingCard = await cardRepository.getCardByTitle(user.id, card.title);
  if (existingCard) throw conflictError('Title already in use');

  const cardInfos: CreateCardData = {
    ...card,
    password: encrypt(card.password),
    securityCode: encrypt(card.securityCode)
  };

  await cardRepository.insertCard(user.id, cardInfos);
}

async function deleteCard(user: User, cardId: number) {
  await getCard(user.id, cardId);
  await cardRepository.deleteCard(cardId);
}

const cardService = {
  getAll,
  getCard,
  createCard,
  deleteCard
};

export default cardService;
