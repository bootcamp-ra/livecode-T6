import teachersDisciplinesRepository from '../repositories/teacherDisciplineRepository';

export async function getByTeacherAndDiscipline(
  teacherId: number,
  disciplineId: number
) {
  return teachersDisciplinesRepository.getByTeacherAndDiscipline(
    teacherId,
    disciplineId
  );
}

const teacherDisciplineService = {
  getByTeacherAndDiscipline
};

export default teacherDisciplineService;
