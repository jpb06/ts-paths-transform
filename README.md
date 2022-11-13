# ts-paths-transform

[![Open in Visual Studio Code](https://img.shields.io/static/v1?logo=visualstudiocode&label=&message=Open%20in%20Visual%20Studio%20Code&labelColor=2c2c32&color=007acc&logoColor=007acc)](https://github.dev/jpb06/ts-paths-transform)
![npm bundle size](https://img.shields.io/bundlephobia/min/ts-paths-transform)
![Github workflow](https://img.shields.io/github/workflow/status/jpb06/ts-paths-transform/Tests?label=Tests&logo=github-actions)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=jpb06_ts-paths-transform&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=jpb06_ts-paths-transform)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=jpb06_ts-paths-transform&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=jpb06_ts-paths-transform)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=jpb06_ts-paths-transform&metric=security_rating)](https://sonarcloud.io/dashboard?id=jpb06_ts-paths-transform)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=jpb06_ts-paths-transform&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=jpb06_ts-paths-transform)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=jpb06_ts-paths-transform&metric=coverage)](https://sonarcloud.io/dashboard?id=jpb06_ts-paths-transform)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=jpb06_ts-paths-transform&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=jpb06_ts-paths-transform)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=jpb06_ts-paths-transform&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=jpb06_ts-paths-transform)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=jpb06_ts-paths-transform&metric=code_smells)](https://sonarcloud.io/dashboard?id=jpb06_ts-paths-transform)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=jpb06_ts-paths-transform&metric=bugs)](https://sonarcloud.io/summary/new_code?id=jpb06_ts-paths-transform)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=jpb06_ts-paths-transform&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=jpb06_ts-paths-transform)
![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/ts-paths-transform?label=snyk%20vulnerabilities)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=jpb06_ts-paths-transform&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=jpb06_ts-paths-transform)
![Last commit](https://img.shields.io/github/last-commit/jpb06/ts-paths-transform?logo=git)

A little helper transforming tsconfig paths to make jest config easier.

<!-- readme-package-icons start -->

<p align="left"><a href="https://docs.github.com/en/actions" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/GithubActions-Dark.svg" /></a>&nbsp;<a href="https://www.typescriptlang.org/docs/" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/TypeScript.svg" /></a>&nbsp;<a href="https://nodejs.org/en/docs/" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/NodeJS-Dark.svg" /></a>&nbsp;<a href="https://pnpm.io/motivation" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Pnpm-Dark.svg" /></a>&nbsp;<a href="https://github.com/conventional-changelog" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/CommitLint.Dark.svg" /></a>&nbsp;<a href="https://eslint.org/docs/latest/" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Eslint-Dark.svg" /></a>&nbsp;<a href="https://jestjs.io/docs/getting-started" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Jest.svg" /></a>&nbsp;<a href="https://prettier.io/docs/en/index.html" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Prettier-Dark.svg" /></a>&nbsp;<a href="https://swc.rs/docs/getting-started" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Swc-Dark.svg" /></a></p>

<!-- readme-package-icons end -->

## ⚡ Install

```bash
yarn add -D ts-paths-transform
```

## ⚡ But why?

Grew tired of adding [`ts-jest`](https://github.com/kulshekhar/ts-jest) just to use its `pathsToModuleNameMapper` function.

## ⚡ Scenario

Let's imagine I want to test a Typescript codebase using jest. I'm using paths like so:

👇 tsconfig.json

```json
{
  [...]
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@cool": ["src/cool/index.ts"],
      "@api/*": ["src/api/*"]
    }
  }
}
```

Now in jest config, I could use the aforementioned `pathsToModuleNameMapper` function or set paths manually in `moduleNameMapper`:

👇 jest.config.ts

```typescript
const options: Config.InitialOptions = {
  // [...]
  moduleNameMapper: {
    '^@cool$': 'src/cool/index.ts',
    '^@api/(.*)$': 'src/api/$1',
  },
  transform: {
    '^.+\\.[tj]sx?$': ['@swc/jest', {}],
  },
};
```

Annoying 🥲

## ⚡ Using `transformTsPaths` function

Let's use the function this library exposes:

👇 jest.config.ts

```typescript
import { transformTsPaths } from `ts-paths-transform`;

import { compilerOptions } from './tsconfig.json';

const options: Config.InitialOptions = {
  // [...]
  moduleNameMapper: {
    // [...]
    ...transformTsPaths(compilerOptions.paths)
  },
  transform: {
    '^.+\\.[tj]sx?$': ['@swc/jest', {}],
  },
};
```

### 🔶 Options

`transformTsPaths` accepts a second argument for options:

```typescript
const paths = transformTsPaths(compilerOptions.paths, {
  prefix: 'blabla',
  verbose: true,
});
```

#### 🧿 `prefix` - string

Prepends each path alias with a prefix:

```typescript
const tsConfigPaths = {
  '@cool': ['src/cool/index.ts'],
  '@api/*': ['src/api/*'],
};
const paths = transformTsPaths(tsConfigPaths, {
  prefix: '<RootDir>/',
});

// Paths =
//  '^@cool$': '<RootDir>/src/cool/index.ts',
//  '^@api/(.*)$': '<RootDir>/src/api/$1',
```

#### 🧿 `verbose` - boolean

Displays transformed output:

```typescript
const tsConfigPaths = {
  '@cool': ['src/cool/index.ts'],
  '@api/*': ['src/api/*'],
};
const paths = transformTsPaths(tsConfigPaths, {
  verbose: true,
});
```

👇 output:

```bash
ts-paths-transform 🚀 - 2 paths were found and transformed ✨
  ^@cool$:                      src/cool/index.ts
  ^@api/(.*)$:                  src/api/$1
```
