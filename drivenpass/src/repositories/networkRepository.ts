import { prisma } from '../config/database';
import { CreateNetworkData } from '../services/networkService';

export async function getAll(userId: number) {
  return prisma.network.findMany({
    where: { userId }
  });
}

export async function getNetwork(userId: number, networkId: number) {
  return prisma.network.findFirst({
    where: {
      userId,
      id: networkId
    }
  });
}

export async function insertNetwork(
  userId: number,
  network: CreateNetworkData
) {
  return prisma.network.create({
    data: { ...network, userId }
  });
}

export async function deleteNetwork(id: number) {
  return prisma.network.delete({
    where: { id }
  });
}
