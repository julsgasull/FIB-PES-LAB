import { gzipSync } from "zlib";

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
        cy.get('#username').type('example');
        cy.wait(300);
        cy.server();          // enable response stubbing
        cy.route({
        method: 'POST',      // Route all GET requests
        url: 'https://purplepoint.herokuapp.com/api/v1/users/register',    // that have a URL that matches '/users/*'
        response: ['fixture:users.json']        // and force the response to be: []
        });
        cy.get('.principalButton').
        should('be.visible').
        click();
        cy.wait(300);
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
        cy.server();          // enable response stubbing
        cy.route({
        method: 'GET',      // Route all GET requests
        url: 'https://purplepoint.herokuapp.com/api/v1/users/email/email@gmail.com',    // that have a URL that matches '/users/*'
        response: ['fixture:users.json']        // and force the response to be: []
        });
        cy.wait(500);

        cy.server()
        cy.route({
            method: 'POST',      // Route all GET requests
            url: 'https://purplepoint.herokuapp.com/api/v1/users/login',
            response: ['fixture:users.json']        // and force the response to be: []
            }).as('login')
        cy.server();          // enable response stubbing
        cy.route({
            method: 'GET',      // Route all GET requests
            url: 'https://purplepoint.herokuapp.com/api/v1/users/email/null',    // that have a URL that matches '/users/*'
            response: ['fixture:users.json']        // and force the response to be: []
        }).as('getUser');

        cy.get('.expandImage > img').click();

        cy.wait('@login').its('status').should('eq', 200)
        cy.wait('@getUser').its('status').should('eq', 200)

        cy.get('.principalButton').click();

        cy.get('#username-profile').type('example');
        cy.get('#name-profile').type('nameExample');
        cy.get('#gender-profile').select('Otro');
        cy.get('#password-profile').type('1234').should('have.value', '1234') 

        cy.wait(2000);
        cy.get('#gender-profile')
        .select('Mujer');
        cy.get('#password-profile').should('have.value', '1234')
        cy.wait(500);
        cy.server();          // enable response stubbing
        cy.route({
        method: 'PUT',      // Route all GET requests
            url:  'https://purplepoint.herokuapp.com/api/v1/users/email/null',    // that have a URL that matches '/users/*'
        response: ['fixture:users.json']        // and force the response to be: []
        }).as('editProfile');

        cy.get(':nth-child(3) > .principalButton').
        should('be.visible').
        click();
    });
});