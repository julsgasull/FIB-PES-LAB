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
        .type('123');
        cy.wait(1000);
        cy.get('.principalButton')
        .click();
        cy.wait(1000);
    });

    it('Login should redirect to mainMenu if the fields introduced are correct', () => {
        cy.get('#password')
        .clear()
        .type('1234');
        cy.wait(1000);
        cy.get('.principalButton')
        .click();
        cy.wait(1000);
        cy.url().should('include', 'mainmenu');
    });

    it('MainMenu should redirect to map and add a new spot', () => {
        // falta redirigir hacia mapa y poder añadir nuevo punto al mapa
    });

    it('MainMenu should redirect to map and remove a new spot', () => {
        // falta redirigir hacia mapa y poder quitar nuevo punto al mapa
    });

    it('MainMenu should redirect to map and move an existing spot', () => {
        // falta redirigir hacia mapa y poder mover un punto existente en el mapa
    });
});