function getLogoutButton() {
  return cy.get('#logout-button');
}

function getLoginButton() {
  return cy.get('[href="#/login"] > button');
}

describe('login', () => {
  it('login button enabled', () => {
    cy.visit('http://localhost:3000/');
    getLoginButton().click();
    getLogoutButton().should('be.disabled');
    cy.get('button').should('contain', 'Login');
  });

  it('Login works', () => {
    cy.login('test', 'test');
    cy.url().should('include', 'dashboard');
    getLogoutButton().should('be.enabled');
    getLoginButton().should('be.disabled');
    cy.get('div[name="drone-widget"]');
  });

  it('Logout works', () => {
    cy.login('test', 'test');
    getLogoutButton().click();
    getLoginButton().should('be.enabled');
    cy.url().should('include', 'login');
  });
});

// describe('session', () => {
//   it('session refresh works', () => {
//     logIn();
//     Cypress.Cookies.debug(true);
//     // Can't really test because cookies are http-only
//   });
// });
