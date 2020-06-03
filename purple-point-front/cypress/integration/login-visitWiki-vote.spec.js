describe('Testing Purple point front login error, visitMap and add a point', () => {
    before(() => {
        cy.visit('http://localhost:4200');
    });
    it('Clicks login should redirect to login view', () => {
        cy.get('.secondaryButton')
        .wait(1500)
        .should('be.visible')
        .click();
        cy.url().should('include', 'login');
    });

    it('Login should fill the login form and redirect to mainmenu', () => {
        cy.get('#email')
        .type('claudia@gmail.com');
        cy.wait(1000);
        cy.get('#password')
        .type('1234');
        cy.wait(1000);

        cy.server()
        cy.route({
            method: 'POST',      // Route all GET requests
            url: 'https://purplepoint.herokuapp.com/api/v1/users/login',
            response: ['fixture:users.json']        // and force the response to be: []
        }).as('login');
        cy.get('.principalButton').click();
        cy.wait('@login').its('status').should('eq', 200);
        cy.wait(1000);
        cy.visit('http://localhost:4200/mainmenu');
        cy.url().should('include', 'mainmenu');
    });

    it('MainMenu should redirect to wiki and vote a concept', () => {
        // falta redirigir hacia wiki y poder votar un concepto
        cy.get('#redirectToWiki').click();
        cy.url().should('include', 'wikifaq');
         
    });

    it('MainMenu should redirect to wiki and unvote a concept', () => {
        // falta redirigir hacia wiki y poder desvotar un concepto
    });

    it('MainMenu should redirect to phones and definitions', () => {
        cy.get('#wikiphonesRedirect').click();
        cy.url().should('include', 'wikiphones');
        cy.get('#wikidefinitionsRedirect').click();
        cy.url().should('include', 'wikidefinitions');
    });
});