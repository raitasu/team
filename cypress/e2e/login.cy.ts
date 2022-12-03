import { RestOperations } from '#cypress/utils/operations';
import { PagePaths } from '~/router/router.constants';
import { TestIds } from '~/shared/layout/testids';
import { LocalStorageKey } from '~/shared/shared.constants';
import { type AuthTokens } from '~/store/api/authentication/authentication.types';

const alfredCode = 'test-code';

const tokens: AuthTokens = {
  access_token: 'test-access-token',
  refresh_token: 'test-refresh-token'
};

const updatedTokens: AuthTokens = {
  access_token: 'refreshed-test-access-token',
  refresh_token: 'refreshed-test-refresh-token'
};

describe('should correctly authorized in the system', () => {
  it('should create access and refresh tokens', () => {
    const alfredHost: string = Cypress.env('ALFRED_HOST');

    cy.useCurrentEmployee('admin');
    cy.useEmployees();

    cy.intercept('POST', `**/${RestOperations.CreateToken}`, (req) => {
      req.reply({
        body: tokens,
        delay: 1000
      });
    }).as(RestOperations.CreateToken);

    cy.visit('/');
    cy.getByTestId(`${TestIds.SignInBtn}`).trigger('click');

    cy.origin(alfredHost, () => {
      cy.location('href').should('include', '/login');
      cy.get('a').contains('Log in');
    });

    cy.visit(`/auth?code=${alfredCode}`);

    cy.wait(`@${RestOperations.CreateToken}`)
      .its('request.body.code')
      .should('equal', alfredCode);

    cy.wait(`@${RestOperations.CurrentEmployee}`)
      .its('request.headers.authorization')
      .should('equal', tokens.access_token);

    cy.wrap(localStorage).should((storage) => {
      const authToken = storage.getItem(LocalStorageKey.AuthToken);
      const refreshToken = storage.getItem(LocalStorageKey.RefreshToken);

      assert.equal(authToken, tokens.access_token);
      assert.equal(refreshToken, tokens.refresh_token);
    });

    cy.location('href').should('include', PagePaths.Employees);
  });

  it('should refresh stale auth token and repeat request', () => {
    cy.intercept('GET', `**/${RestOperations.CurrentEmployee}`, (req) => {
      req.reply({
        statusCode: 401
      });
    }).as(RestOperations.CurrentEmployee);

    cy.intercept('GET', `**/${RestOperations.RefreshToken}`, (req) => {
      req.reply({
        body: updatedTokens
      });
    }).as(RestOperations.RefreshToken);

    localStorage.setItem(LocalStorageKey.AuthToken, tokens.access_token);
    localStorage.setItem(LocalStorageKey.RefreshToken, tokens.refresh_token);

    cy.visit('/');
    cy.wait(`@${RestOperations.CurrentEmployee}`)
      .its('response.statusCode')
      .should('equal', 401);

    cy.useCurrentEmployee('admin');
    cy.useEmployees();

    cy.wait(`@${RestOperations.RefreshToken}`)
      .its('response.statusCode')
      .should('equal', 200);

    cy.wait(`@${RestOperations.CurrentEmployee}`)
      .its('response.statusCode')
      .should('equal', 200);

    cy.wrap(localStorage).should((storage) => {
      const authToken = storage.getItem(LocalStorageKey.AuthToken);
      const refreshToken = storage.getItem(LocalStorageKey.RefreshToken);

      assert.equal(authToken, updatedTokens.access_token);
      assert.equal(refreshToken, updatedTokens.refresh_token);
    });

    cy.location('href').should('include', PagePaths.Employees);
  });

  it('should remove both stale tokens and redirect on login', () => {
    cy.intercept('GET', `**/${RestOperations.CurrentEmployee}`, (req) => {
      req.reply({
        statusCode: 401
      });
    }).as(RestOperations.CurrentEmployee);

    cy.intercept('GET', `**/${RestOperations.RefreshToken}`, (req) => {
      req.reply({
        statusCode: 401
      });
    }).as(RestOperations.RefreshToken);

    localStorage.setItem(LocalStorageKey.AuthToken, tokens.access_token);
    localStorage.setItem(LocalStorageKey.RefreshToken, tokens.refresh_token);

    cy.visit('/');
    cy.wait(`@${RestOperations.CurrentEmployee}`)
      .its('response.statusCode')
      .should('equal', 401);

    cy.wait(`@${RestOperations.RefreshToken}`)
      .its('response.statusCode')
      .should('equal', 401);

    cy.wrap(localStorage).should((storage) => {
      const authToken = storage.getItem(LocalStorageKey.AuthToken);
      const refreshToken = storage.getItem(LocalStorageKey.RefreshToken);

      assert.equal(authToken, null);
      assert.equal(refreshToken, null);
    });

    cy.location('href').should('include', PagePaths.Login);
  });
});
