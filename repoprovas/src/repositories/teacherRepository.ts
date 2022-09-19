import { prisma } from '../database';

async function getById(id: number) {
  return prisma.teacher.findUnique({
    where: { id }
  });
}

async function getByDiscipline(discipline: number) {
  return prisma.teacher.findMany({
    where: { teacherDisciplines: { some: { disciplineId: discipline } } }
  });
}

const teacherRepository = {
  getById,
  getByDiscipline
};

export default teacherRepository;
