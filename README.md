# Team project

![Tests](https://github.com/cybergizer-hq/team-front/actions/workflows/code-quality.yml/badge.svg?branch=main)
![Storybook](https://github.com/cybergizer-hq/team-front/actions/workflows/storybook.yml/badge.svg?branch=main)

## Installation

> Before start make sure that you're using the right node version.
> You can use [nvm](https://github.com/nvm-sh/nvm) to change node version to one that specified inside `.nvmrc`.

Run command:

```shell
npm ci
```

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

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Commit Style Guide

Project follows [Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/)

## Code Style Guide:

- Code style is inspired by [Airbnb Guide](https://github.com/airbnb/javascript#airbnb-javascript-style-guide)
- If you find that some rules are harmful or missing raise a PR with your proposal

## Storybook

- We are using [Storybook](https://storybook.js.org/docs/react/writing-stories/introduction) for building UI components and pages.
- Storybook for main branch is accessible via [URL](https://staevs.ddns.net/)

## Releasing

- Manually trigger `Release` workflow from actions tab on `main` branch
