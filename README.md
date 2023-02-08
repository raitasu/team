# Team project

![Build](https://github.com/cybergizer-hq/team-front/actions/workflows/main.yml/badge.svg?branch=main)
![Staging Deploy](https://github.com/cybergizer-hq/team-front/actions/workflows/deploy_staging.yml/badge.svg?branch=main)

## Application links

- [Staging](https://d2xyex20ve59hj.cloudfront.net/)
- [Storybook](https://main--63494e41f8bea2d9d59c6279.chromatic.com/)

## Installation

### Installing https certificates

- Install [mkcert](https://github.com/FiloSottile/mkcert) package. Follow carefully the instructions for your system (prefer installing from the pre-built binaries)
- On Unix systems run `./scripts/generate_certificate.sh`.
- On Windows run the same commands from `./scripts/generate_certificate.sh` in PowerShell from the project root.

### Installing dependencies

> Before start, make sure that you're using the right node version.
> You can use [nvm](https://github.com/nvm-sh/nvm)
> to change a node version to one that specified inside `.nvmrc`.

- Run command `npm ci`

## Running application

| Command                          | Description                                                                |
| -------------------------------- | -------------------------------------------------------------------------- |
| `npm run start`                  | Running application in development mode.                                   |
| `npm run start:with-mock-server` | Running application in development mode and with [msw](https://mswjs.io/). |

## Testing application

We are using [Vitest](https://vitest.dev/) for unit tests and [Cypress](https://docs.cypress.io/guides/getting-started/installing-cypress) for integration tests

| Command                  | Description                                                                    |
| ------------------------ | ------------------------------------------------------------------------------ |
| `build:test`             | Builds application to use in Cypress tests.                                    |
| `cy:open`                | Opens Cypress UI.                                                              |
| `cy:run`                 | Runs Cypress tests.                                                            |
| `start:test`             | Runs dev server to use in Cypress tests.                                       |
| `test`                   | Runs unit tests in watch mode.                                                 |
| `test:ci`                | Runs unit tests once and outputs test coverage.                                |
| `test:integration:debug` | Builds application to use in Cypress tests and serves files from build folder. |
| `preview:test`           | Serves files from build folder to use in Cypress tests.                        |

### Running unit tests

- Run `npm run test`

### Emulating running unit tests in CI

- Run `npm run test:ci`

### Developing integration/components tests

- Run `npm run start:test`
- Wait unless server is started
- Run `npm run cy:open`
- Use Cypress UI to select test

### Emulating running integration/components tests in CI

- Run `npm run test:integration:debug`
- Wait unless server is started
- Run `npm run cy:run`

### Debugging failed integration/components tests in CI

- Run `npm run test:integration:debug`
- Run `npm run cy:open`
- Wait unless server is started
- Use Cypress UI to select test you want to debug

## Installing new packages

Dependencies saved to package.json will be configured with an exact version rather than using npm's default semver range operator.

```shell
npm install <package-name> --save-exact
npm install <package-name> --save-dev --save-exact
```

## Updating packages

We recommend using [npm-upgrade](https://www.npmjs.com/package/npm-upgrade) to manage dependencies.

```shell
npm-upgrade
```

## Build tools

This project was bootstrapped with [Vite](https://vitejs.dev/).

## Commit Style Guide

Project follows [Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/)

> Confused picking commit name? Consult this [cheatsheet](https://kapeli.com/cheat_sheets/Conventional_Commits.docset/Contents/Resources/Documents/index)

## Code Style Guide:

- Code style is inspired by [Airbnb Guide](https://github.com/airbnb/javascript#airbnb-javascript-style-guide)
- If you find that some rules are harmful or missing raise a PR with your proposal

| Command                  | Description                                                                                          |
| ------------------------ | ---------------------------------------------------------------------------------------------------- |
| `npm run audit:deadcode` | Check for unused exports from modules. Results would be written into `deadcode.txt` in project root. |
| `npm run lint`           | Runs code style and format checks and prints results to console.                                     |
| `npm run format`         | Runs code style and format checks and tries to autofix problems                                      |

## Internationalization

- We are using [react-i18next](https://react.i18next.com/)
- Date formats: [date-fns](https://date-fns.org/), [date formats](https://date-fns.org/v2.29.3/docs/format)

## Storybook

- We are using [Storybook](https://storybook.js.org/docs/react/writing-stories/introduction) for building UI components and pages.
- We are hosting Storyboook on [Chromatic](https://www.chromatic.com/library?appId=63494e41f8bea2d9d59c6279)

| Command                   | Description                             |
| ------------------------- | --------------------------------------- |
| `npm run storybook`       | Launches Storybook in development mode. |
| `npm run build-storybook` | Builds Storybook for hosting.           |
| `npm run chromatic`       | Updates Storybook in Chromatic project. |

## Releasing

- Manually trigger `Release` workflow from actions tab on `main` branch

| Command                    | Description                                                                                                                                |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `npm run build`            | Builds project for production use.                                                                                                         |
| `npm run build:staging`    | Builds project for staging use. Pass [--base](https://vitejs.dev/config/shared-options.html#base) option while building application in CI. |
| `npm run semantic-release` | Creates a tag and release notes for a new version. Should be triggered on main branch within CI.                                           |

## Authorization

- We are using [Alfred](https://github.com/cybergizer-hq/alfred#on-the-frontend) for user authentication.

| Environment variable       | Description                           | Localtion            |
| -------------------------- | ------------------------------------- | -------------------- |
| `VITE_ALFRED_URL`          | Alfred host                           | `.env`               |
| `VITE_ALFRED_REDIRECT_URI` | URI to redirect after successful auth | `.env.{environment}` |
| `VITE_ALFRED_CLIENT_ID`    | UUID of Alfred application            | `.env.{environment}` |

## API

- [Swagger](https://team-stage.cybergizer.com/api-docs/index.html#/Employees/get_employees)
- [Repository](https://github.com/cybergizer-hq/team)

| Environment variable  | Description | Location             |
| --------------------- | ----------- | -------------------- |
| `VITE_PUBLIC_API_URL` | API host    | `.env.{environment}` |
