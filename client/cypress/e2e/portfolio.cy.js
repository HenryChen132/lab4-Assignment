// client/cypress/e2e/portfolio.cy.js
describe('Portfolio E2E - Sign in and navigate', () => {
  it('allows user to sign in and see Home page', () => {
    
    cy.visit('/');


    cy.contains('Sign In').click();

    cy.get('input[name="email"]').type('henrychen@hotmail.com');
    cy.get('input[name="password"]').type('123456');

    cy.get('form').within(() => {
      cy.contains('button', 'Sign In').click();
    });

    
    cy.contains(/Logged in as/i).should('exist');


    cy.contains('Project').click();
    cy.url().should('include', '/project');
    cy.contains(/My Projects/i).should('exist');
  });
});
