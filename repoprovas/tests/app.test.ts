import { faker } from '@faker-js/faker';
import supertest from 'supertest';
import app from '../src/app';
import { prisma } from '../src/database';
import {
  createScenarioOneTeacherWithOneTest,
  createScenarioTwoTeachersWithTwoTestsEach,
  deleteAllData,
  disconnectPrisma
} from './factories/scenarioFactory';
import { tokenFactory } from './factories/tokenFactory';
import userFactory from './factories/userFactory';

beforeEach(async () => {
  await deleteAllData();
});

const server = supertest(app);

describe('Testes com usuário', () => {
  it('Testa POST /sing-up passando usuário válido', async () => {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password()
    };

    const result = await server.post('/sign-up').send(user);

    const createdUser = await prisma.user.findFirst({
      where: { email: user.email }
    });

    expect(result.status).toBe(201);
    expect(createdUser).not.toBeNull();
  });

  it('Testa POST /sing-up passando usuário que já existe', async () => {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password()
    };

    await userFactory(user);

    const result = await server.post('/sign-up').send(user);

    expect(result.status).toBe(409);
  });

  it('Testa POST /sign-in passando usuário válido', async () => {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password()
    };

    await userFactory(user);

    const response = await server.post('/sign-in').send(user);

    const { token } = response.body;

    expect(token).not.toBeFalsy();
  });

  it('Testa POST /sign-in passando usuário inválido', async () => {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password()
    };

    const response = await server.post('/sign-in').send(user);

    const { token } = response.body;

    expect(token).toBeFalsy();
  });
});

describe('Testes com provas', () => {
  it('Testa se cria um prova com sucesso', async () => {
    const { category, discipline, teacher } =
      await createScenarioOneTeacherWithOneTest();

    const test = {
      name: faker.lorem.words(5),
      pdfUrl: faker.internet.url(),
      categoryId: category.id,
      disciplineId: discipline.id,
      teacherId: teacher.id
    };

    const token = await tokenFactory();

    const response = await server
      .post('/tests')
      .set('Authorization', `Bearer ${token}`)
      .send(test);

    expect(response.status).toBe(201);
  });

  it('Retorna as provas agrupadas por disciplina', async () => {
    await createScenarioOneTeacherWithOneTest();
    const token = await tokenFactory();

    const response = await server
      .get('/tests?groupBy=disciplines')
      .set('Authorization', `Bearer ${token}`);

    expect(response.body.tests.length).toEqual(3);
    expect(response.body.tests[0].disciplines.length).toEqual(1);
  });

  it('Retorna as provas agrupadas por instrutor', async () => {
    const scenario = await createScenarioTwoTeachersWithTwoTestsEach();

    const token = await tokenFactory();

    const response = await server
      .get('/tests?groupBy=teachers')
      .set('Authorization', `Bearer ${token}`);

    const { tests } = response.body;
    expect(tests.length).toBe(2);
    expect(tests[0].teacher).toBe(scenario.teachers[0].name);
    expect(tests[0].categories.length).toBe(1);
    expect(tests[0].categories[0].tests.length).toBe(2);

    expect(tests[1].teacher).toBe(scenario.teachers[1].name);
    expect(tests[1].categories.length).toBe(1);
    expect(tests[1].categories[0].tests.length).toBe(2);
  });
});

afterAll(async () => {
  await disconnectPrisma();
});
