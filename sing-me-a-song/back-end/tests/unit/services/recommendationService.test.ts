import { recommendationRepository } from '../../../src/repositories/recommendationRepository';
import { recommendationService } from '../../../src/services/recommendationsService';
import { conflictError } from '../../../src/utils/errorUtils';

describe('Recommendations service', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('Testa o insert no service, passando dados válidos', async () => {
    const recommendation = {
      name: 'Caneta Azul',
      youtubeLink: 'https://www.youtube.com/watch?v=wiPNYqwRjYE'
    };

    jest.spyOn(recommendationRepository, 'findByName').mockResolvedValue(null);
    jest
      .spyOn(recommendationRepository, 'create')
      .mockImplementationOnce((): any => {});

    await recommendationService.insert(recommendation);

    expect(recommendationRepository.create).toBeCalled();
  });

  it('Testa que não permite criar recomendação duplicada', async () => {
    const recommendation = {
      name: 'Caneta Azul',
      youtubeLink: 'https://www.youtube.com/watch?v=wiPNYqwRjYE'
    };

    jest.spyOn(recommendationRepository, 'findByName').mockResolvedValue({
      id: 2,
      score: 10,
      ...recommendation
    });

    jest
      .spyOn(recommendationRepository, 'create')
      .mockImplementationOnce((): any => {});

    const promise = recommendationService.insert(recommendation);
    expect(promise).rejects.toEqual(
      conflictError('Recommendations names must be unique')
    );
    expect(recommendationRepository.create).not.toBeCalled();
  });
});
