/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
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
//

declare namespace Cypress {
  interface Chainable<Subject> {
    getBySel(selector: string, ...args): Chainable<any>;
    visitWithInitialTodos(initialTodos: any[], ...args): Chainable<any>;
    createDefaultTodos(): Chainable<any>;
  }
}

Cypress.Commands.add('getBySel', (selector, ...args) => {
  return cy.get(`[data-test=${selector}]`, ...args);
});

Cypress.Commands.add('visitWithInitialTodos', (initialTodos: any[]) => {
  cy.visit('/', {
    onBeforeLoad(win) {
      win.localStorage.setItem('todos', JSON.stringify(initialTodos));
    },
  });

  return cy.getBySel('todo-list');
});

Cypress.Commands.add('createDefaultTodos', () => {
  let log = Cypress.log({
    name: 'create default todos',
    message: [],
    consoleProps() {
      return {
        'Inserted Todos': ['todo 1', 'todo 2', 'todo 3'],
      };
    },
  });

  cy.getBySel('new-todo-input').type('todo 1{enter}', { log: false });
  cy.getBySel('new-todo-input').type('todo 2{enter}', { log: false });
  cy.getBySel('new-todo-input').type('todo 3{enter}', { log: false });

  return cy.get('.todo-list li', { log: false });
});
