import { Request, Response } from 'express';
import teacherService from '../services/teacherService';

async function get(req: Request, res: Response) {
  const { discipline } = req.params;

  const teachers = await teacherService.getByDiscipline(+discipline);
  res.send(teachers);
}

const teachersController = {
  get
};

export default teachersController;
