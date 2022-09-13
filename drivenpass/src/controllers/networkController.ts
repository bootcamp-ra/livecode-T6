import { Request, Response } from 'express';

import networkService from '../services/networkService';

export async function getAllNetworks(req: Request, res: Response) {
  const { user } = res.locals;
  const networks = await networkService.getAllNetworks(user.id);

  res.send(networks);
}

export async function getNetwork(req: Request, res: Response) {
  const { user } = res.locals;
  const networkId = parseInt(req.params.id);
  if (isNaN(networkId)) {
    res.sendStatus(422); // unprocessable entity
  }

  const network = await networkService.getNetwork(user.id, networkId);
  res.send(network);
}

export async function createNetwork(req: Request, res: Response) {
  const { user } = res.locals;
  const network = req.body;

  await networkService.createNetwork(user, network);
  res.sendStatus(201); // created
}

export async function deleteNetwork(req: Request, res: Response) {
  const networkId = parseInt(req.params.id);
  if (isNaN(networkId)) {
    res.sendStatus(422); // unprocessable entity
  }

  const { user } = res.locals;
  await networkService.deleteNetwork(user, networkId);
  res.sendStatus(200);
}
