import { RestOperations } from '#cypress/utils/operations';

declare global {
  namespace Cypress {
    interface Chainable {
      useEmployees(): void;
    }
  }
}

Cypress.Commands.add('useEmployees', () => {
  cy.intercept('GET', `**/${RestOperations.EmployeesList}**`, (req) => {
    req.reply({
      fixture: 'employees.json',
      delay: 1000
    });
  }).as(RestOperations.EmployeesList);
});
