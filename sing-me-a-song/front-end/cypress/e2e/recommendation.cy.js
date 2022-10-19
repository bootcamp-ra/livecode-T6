/// <reference types="cypress" />

describe('Testa o fluxo de recommendation', () => {
  it('Deve criar uma recomendação de música', async () => {
    const recommendation = {
      name: 'Caneta Azul',
      youtubeLink: 'https://www.youtube.com/watch?v=wiPNYqwRjYE'
    };

    cy.visit('http://localhost:3000/');
    cy.get('input[placeholder="Name"]').type(recommendation.name);
    cy.get('input[placeholder="https://youtu.be/..."]').type(
      recommendation.youtubeLink
    );

    cy.intercept('POST', 'http://localhost:5000/recommendations').as(
      'createRecommendation'
    );

    cy.get('button').click();

    cy.wait('@createRecommendation');

    cy.contains(recommendation.name);
  });
});
