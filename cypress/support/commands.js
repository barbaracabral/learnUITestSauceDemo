// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
//-- This is a parent command --
Cypress.Commands.add('login', (username, password) => {
    cy.session(['session-username', username], () => {
        cy.visit('/');
        cy.get('#user-name').type(username);
        cy.get('[data-test="password"]').type(password);
        cy.get('[data-test="login-button"]').click();
    },
        {
            cacheAcrossSpecs: true
        }
    )
})
Cypress.Commands.add('programmaticLogin', (username) => {
    cy.setCookie('session-username', username)
    cy.visit('/inventory.html', { failOnStatusCode: false })
})
Cypress.Commands.add('loginWithAPI', (username, password) => {
    cy.visit('/');
    cy.get('#user-name').type(username);
    cy.get('[data-test="password"]').type(password);
    cy.get('[data-test="login-button"]').click();
    cy.session(['session-username', username], (username) => {
        return username
    },
        {
            cacheAcrossSpecs: true
        }
    )
})
// Cypress.Commands.add('login', (username, password) => {
//     cy.session(
//         [username, password],
//         () => {
//             cy.get('#user-name').type(username);
//             cy.get('[data-test="password"]').type(password);
//             cy.get('[data-test="login-button"]').click();
//         });
// })
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add("saveLocalStorage", () => {
    Object.keys(localStorage).forEach(key => {
        LOCAL_STORAGE_MEMORY[key] = localStorage[key];
    });
});

Cypress.Commands.add("restoreLocalStorage", () => {
    Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
        localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
    });
});