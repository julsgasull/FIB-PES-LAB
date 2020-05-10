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

    it('Login should fill email field of the form and show password error', () => {
        cy.get('#email')
        .type('email@gmail.com');
        cy.wait(1000);
        cy.get('.principalButton')
        .click();
        cy.wait(1000);
    });

    it('Login should show error because the fields  introduced are not correct', () => {
        cy.get('#password')
        .type('1234');
        cy.wait(1000);
        cy.get('.principalButton')
        .click();
        cy.wait(1000);
    });

    it('Login should redirect to mainMenu if the fields introduced are correct', () => {
        cy.get('#password')
        .clear()
        .type('12345');
        cy.wait(1000);
        cy.get('.principalButton')
        .click();
        cy.wait(1000);
        cy.url().should('include', 'mainmenu');
    });

    it('MainMenu should redirect to profile and update it', () => {
    
    });
});