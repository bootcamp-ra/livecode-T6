import teacherRepository from '../repositories/teacherRepository';

async function getById(id: number) {
  return teacherRepository.getById(id);
}

async function getByDiscipline(discipline: number) {
  return teacherRepository.getByDiscipline(discipline);
}

const teacherService = {
  getById,
  getByDiscipline
};

export default teacherService;
