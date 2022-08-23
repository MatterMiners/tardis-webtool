const filterBtn = '.h-20 > .flex > :nth-child(3)';

describe('empty spec', () => {
  beforeEach(() => {
    cy.login('test', 'test');
  }),
    it('filters work', () => {
      cy.contains('Select Site').should('not.be.visible');
      cy.get(filterBtn).click();
      cy.contains('Select Site').should('be.visible');
      cy.contains('Select State').click();
      cy.get('.myselectul').contains('AvailableState').click();
      cy.get('.flex-row > .myselectbtn').contains('AvailableState');
      cy.get('.h-20').click();
      // works only for db with each state present
      cy.get('ShutDownState').should('not.exist');
      cy.get('.flex-row > .myselectbtn').click();
      cy.get('.flex-row > .myselectbtn').should('not.exist');
      // cy.get('ShutDownState').should('exist');

      // text filter widget
      cy.get('.myselectul').should('not.exist');
      cy.get('.flex-wrap > .flex > .myselectcontainer > .myselectbtn').click();
      cy.get('.myselectul').should('contain', 'Drone UUID');
    });
});
