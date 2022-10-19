import { faker } from '@faker-js/faker';
import supertest from 'supertest';
import app from '../../src/app';
import { recommendationService } from '../../src/services/recommendationsService';

describe('Testa a integração do recommendation', () => {
  beforeEach(async () => {
    await recommendationService.reset();
  });

  it('Testa se cria recomendação passando dados válidos', async () => {
    const recommendation = {
      name: faker.music.songName(),
      youtubeLink: 'https://www.youtube.com/watch?v=wiPNYqwRjYE'
    };

    const response = await supertest(app)
      .post('/recommendations')
      .send(recommendation);

    expect(response.status).toBe(201);
  });
});
