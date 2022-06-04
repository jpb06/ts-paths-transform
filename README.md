# ts-paths-transfom

[![Open in Visual Studio Code](https://img.shields.io/static/v1?logo=visualstudiocode&label=&message=Open%20in%20Visual%20Studio%20Code&labelColor=2c2c32&color=007acc&logoColor=007acc)](https://github.dev/jpb06/ts-paths-transfom)
![npm bundle size](https://img.shields.io/bundlephobia/min/ts-paths-transfom)
![Github workflow](https://img.shields.io/github/workflow/status/jpb06/ts-paths-transfom/Main%20workflow?label=Tests&logo=github-actions)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=jpb06_ts-paths-transfom&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=jpb06_ts-paths-transfom)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=jpb06_ts-paths-transfom&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=jpb06_ts-paths-transfom)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=jpb06_ts-paths-transfom&metric=security_rating)](https://sonarcloud.io/dashboard?id=jpb06_ts-paths-transfom)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=jpb06_ts-paths-transfom&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=jpb06_ts-paths-transfom)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=jpb06_ts-paths-transfom&metric=coverage)](https://sonarcloud.io/dashboard?id=jpb06_ts-paths-transfom)
![Coverage](./badges/coverage-jest%20coverage.svg)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=jpb06_ts-paths-transfom&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=jpb06_ts-paths-transfom)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=jpb06_ts-paths-transfom&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=jpb06_ts-paths-transfom)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=jpb06_ts-paths-transfom&metric=code_smells)](https://sonarcloud.io/dashboard?id=jpb06_ts-paths-transfom)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=jpb06_ts-paths-transfom&metric=bugs)](https://sonarcloud.io/summary/new_code?id=jpb06_ts-paths-transfom)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=jpb06_ts-paths-transfom&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=jpb06_ts-paths-transfom)
![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/ts-paths-transfom?label=snyk%20vulnerabilities)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=jpb06_ts-paths-transfom&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=jpb06_ts-paths-transfom)
![Last commit](https://img.shields.io/github/last-commit/jpb06/ts-paths-transfom?logo=git)

## ⚡ But why?

Grew tired of adding [`ts-jest`](https://github.com/kulshekhar/ts-jest) just to use the `pathsToModuleNameMapper` function.

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

Now in jest config, I could use the aforementioned `pathsToModuleNameMapper` function or set paths manually in `moduleNameMapper` like so:

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
import { transformTsPaths } from `ts-paths-transfom`;

const { compilerOptions } = require('./tsconfig.json');

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
  debug: true,
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

#### 🧿 `debug` - boolean

Displays transformed output:

```typescript
const tsConfigPaths = {
  '@cool': ['src/cool/index.ts'],
  '@api/*': ['src/api/*'],
};
const paths = transformTsPaths(tsConfigPaths, {
  debug: true,
});
```

👇 output:

```bash
ts-paths-transfom 🚀 - 2 paths were found and transformed ✨
  ^@cool$:                      src/cool/index.ts
  ^@api/(.*)$:                  src/api/$1
```
