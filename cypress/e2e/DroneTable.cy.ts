describe('drone table', () => {
  beforeEach(() => {
    cy.login('test', 'test');
  }),
    it('table loads', () => {
      cy.intercept('GET', '/api/tardis/resources/').as('getResources');

      cy.get('[href="#/protected/dronetable"] > .btn').click();

      cy.wait('@getResources').then((xhr) => {
        expect(xhr.response!.statusCode).to.eq(200);
      });

      cy.contains('Drone UUID');
    });
  it('test sorting', () => {
    // TODO
  });
});
