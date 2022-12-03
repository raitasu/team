import { RestOperations } from '#cypress/utils/operations';
import { type EmployeeRole } from '~/store/api/employees/employees.types';

declare global {
  namespace Cypress {
    interface Chainable {
      useCurrentEmployee(role?: EmployeeRole): void;
    }
  }
}

Cypress.Commands.add('useCurrentEmployee', (role = 'user') => {
  cy.intercept('GET', `**/${RestOperations.CurrentEmployee}`, (req) => {
    req.reply({
      fixture: role === 'admin' ? 'admin.json' : 'user.json',
      delay: 1000
    });
  }).as(RestOperations.CurrentEmployee);
});
