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
        .type('email@gmail.com');
        cy.wait(1000);
        cy.get('#password')
        .type('1234');
        cy.wait(1000);
        cy.get('.principalButton')
        .click();
        cy.wait(1000);
        cy.url().should('include', 'mainmenu');
    });

    it('MainMenu should redirect to wiki and vote a concept', () => {
        // falta redirigir hacia wiki y poder votar un concepto
    });

    it('MainMenu should redirect to wiki and unvote a concept', () => {
        // falta redirigir hacia wiki y poder desvotar un concepto
    });

    it('MainMenu should redirect to the concept selected', () => {
        // falta redirigir hacia el concepto seleccionado
    });
});