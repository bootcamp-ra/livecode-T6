import { Credential, User } from '@prisma/client';
import * as credentialRepository from '../repositories/credentialRepository';
import { decrypt, encrypt } from '../utils/criptrUtils';
import {
  conflictError,
  notFoundError,
  unauthorizedError
} from '../utils/errorUtils';

export type CreateCredentialData = Omit<Credential, 'id'>;

async function getAllCredentials(userId: number) {
  const credentials = await credentialRepository.getAll(userId);
  return credentials.map(credential => {
    const { password } = credential;
    return { ...credential, password: decrypt(password) };
  });
}

async function getCredential(userId: number, credentialId: number) {
  const credential = await credentialRepository.getCredential(
    userId,
    credentialId
  );
  if (!credential) throw notFoundError("Credential doesn't exist");

  return {
    ...credential,
    password: decrypt(credential.password)
  };
}

async function createCredential(user: User, credential: CreateCredentialData) {
  // title must be unique
  const existingCredential = await credentialRepository.getCredentialByTitle(
    user.id,
    credential.title
  );
  if (existingCredential) throw conflictError('Title already in use');

  const credencialPassword = credential.password;
  const credentialInfos = {
    ...credential,
    password: encrypt(credencialPassword)
  };

  await credentialRepository.insertCredential(user.id, credentialInfos);
}

async function deleteCredential(user: User, credentialId: number) {
  await getCredential(user.id, credentialId);
  await credentialRepository.deleteCredential(credentialId);
}

const credentialService = {
  getCredential,
  getAllCredentials,
  createCredential,
  deleteCredential
};

export default credentialService;
