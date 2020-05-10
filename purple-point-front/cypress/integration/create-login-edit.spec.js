describe('Testing Purple point front creating a new user, login and edit profile', () => {
    before(() => {
        cy.visit('http://localhost:4200');
    });
    it('Clicks register should redirect to signup view', () => {
        cy.get('.principalButton')
        .wait(1500)
        .should('be.visible')
        .click();
        cy.url().should('include', 'signup');
    });

    it('Signup should fill all the form fields and redirect to principal view', () => {
        cy.get('#email').type('email@gmail.com');
        cy.wait(300);
        cy.get('#username').type('example');
        cy.wait(300);
        cy.get('#name').type('nameExample');
        cy.wait(300);
        cy.get('#password').type('1234');
        cy.wait(300);
        cy.get('#repeatPassword').type('1234');
        cy.wait(300);
        cy.get('#gender').select('Otro');
        cy.wait(300);
        cy.get('.principalButton').
        should('be.visible').
        click();
        cy.url().should('include', 'login');
    });

    it('Login should redirect to mainMenu if the fields introduces are correct', () => {
        cy.visit('http://localhost:4200/login');
        cy.get('#email').type('email@gmail.com');
        cy.wait(300);
        cy.get('#password').type('1234');
        cy.wait(300);
        cy.get('.principalButton').
        should('be.visible').
        click();
        cy.url().should('include', 'mainmenu');
    });

    it('MainMenu should redirect to profile and update it', () => {
        cy.visit('http://localhost:4200/mainmenu');
        cy.wait(500);
        cy.get('.expandImage > img').
        click();
        cy.get('.principalButton').
        click();
        cy.wait(500);
        cy.get(':nth-child(1) > .col-9 > .form-control').
        type('12345');
        cy.wait(500);
        cy.get(':nth-child(3) > .principalButton').
        should('be.visible').
        click();
        cy.get(':nth-child(3) > .principalButton').
        should('not.be.visible')
    });
});