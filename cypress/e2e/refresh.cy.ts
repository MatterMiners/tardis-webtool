describe('refresh', () => {
  beforeEach(() => {
    cy.login('test', 'test');
  });

  it('refresh works', () => {
    cy.intercept('GET', '/api/tardis/resources/').as('getResources');

    cy.get('#update-button').click();

    cy.wait('@getResources').then((xhr) => {
      expect(xhr.response!.statusCode).to.eq(200);
    });
  });
});
