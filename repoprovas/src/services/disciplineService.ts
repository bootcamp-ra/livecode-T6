import disciplineRepository from './../repositories/disciplineRepository';

async function getById(id: number) {
  return disciplineRepository.getById(id);
}

async function getByTerm(term: number) {
  return disciplineRepository.getByTerm(term);
}

const disciplineService = {
  getById,
  getByTerm
};

export default disciplineService;
