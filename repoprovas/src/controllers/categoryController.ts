import { Request, Response } from 'express';
import categoryService from '../services/categoryService';

async function findMany(req: Request, res: Response) {
  const categories = await categoryService.findMany();
  res.send({ categories });
}

const categoryController = {
  findMany
};

export default categoryController;
