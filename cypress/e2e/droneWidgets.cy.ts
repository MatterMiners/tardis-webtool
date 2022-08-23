function widget() {
  return cy.get('div[name="drone-widget"]');
}

describe('droneWidgets', () => {
  beforeEach(() => {
    cy.login('test', 'test');
  });
  it('droneWidgets expands', () => {
    widget().should('contain', 'State');
    cy.get('div[name="drone-widget"] .overflow-hidden');
    cy.get('button[name="widget-collapse-button"]').first().click();
    widget().first().should('not.contain', '.overflow-hidden');
  });
  //   it('drain button', () => {
  //     cy.get('[name="drone-state"]').should('not.contain', 'DrainState');
  //     widget().get('button[name="drain-button"]').should('not.be.disabled');
  //     //  widget().get('button[name="drain-button"]').click();
  //     //widget().get('button[name="drain-button"]').should('contain', 'Drain');
  //   });
});
