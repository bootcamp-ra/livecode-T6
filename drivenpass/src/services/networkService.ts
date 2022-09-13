import { Network, User } from '@prisma/client';

import * as networkRepository from '../repositories/networkRepository';
import { decrypt, encrypt } from '../utils/criptrUtils';
import { notFoundError } from '../utils/errorUtils';

export type CreateNetworkData = Omit<Network, 'id'>;

async function getAllNetworks(userId: number) {
  const networks = await networkRepository.getAll(userId);
  return networks.map(network => {
    return { ...network, password: decrypt(network.password) };
  });
}

async function getNetwork(userId: number, networkId: number) {
  const network = await networkRepository.getNetwork(userId, networkId);
  if (!network) throw notFoundError("Network doesn't exist");

  return {
    ...network,
    password: decrypt(network.password)
  };
}

async function createNetwork(user: User, network: CreateNetworkData) {
  const networkInfos = { ...network, password: encrypt(network.password) };
  await networkRepository.insertNetwork(user.id, networkInfos);
}

async function deleteNetwork(user: User, networkId: number) {
  await getNetwork(user.id, networkId);
  await networkRepository.deleteNetwork(networkId);
}

const networkService = {
  getNetwork,
  getAllNetworks,
  createNetwork,
  deleteNetwork
};

export default networkService;
