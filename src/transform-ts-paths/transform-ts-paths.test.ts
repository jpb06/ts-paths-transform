/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-console */
import chalk from 'chalk';
import prettyJson from 'prettyjson';

import {
  pathsAlias,
  transformedPathAlias,
  transformedPathAliasWithPrefix,
} from '../tests/mock-data/paths-alias.mock-data';
import { transformTsPaths } from './transform-ts-paths';

describe('transformTsPaths function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'info').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should transform paths', () => {
    const result = transformTsPaths(pathsAlias, { debug: true });

    expect(result).toStrictEqual(transformedPathAlias);
  });

  it('should transform paths with a prefix', () => {
    const result = transformTsPaths(pathsAlias, {
      prefix: '<RootDir>/../../',
    });

    expect(result).toStrictEqual(transformedPathAliasWithPrefix);
  });

  it('should transform nothing', () => {
    const result = transformTsPaths({});

    expect(result).toStrictEqual({});
  });

  it('should display a log when no paths were transformed', () => {
    const paths = {};
    const debug = true;

    transformTsPaths(paths, { debug });

    expect(console.error).toHaveBeenCalledTimes(0);
    expect(console.info).toHaveBeenCalledTimes(1);
    expect(console.info).toHaveBeenCalledWith(
      `${chalk.cyanBright.underline.bold(
        'ts-paths-transform',
      )} 🤷 ${chalk.whiteBright('-')} ${chalk.redBright.bold(
        'No paths found',
      )}`,
    );
  });

  it('should display a log when paths were transformed', () => {
    transformTsPaths(pathsAlias, { debug: true });

    expect(console.error).toHaveBeenCalledTimes(0);
    expect(console.info).toHaveBeenCalledTimes(1);
    expect(console.info).toHaveBeenCalledWith(
      `${chalk.cyanBright.underline.bold(
        'ts-paths-transform',
      )} 🚀 ${chalk.whiteBright('-')} ${chalk.blueBright.bold(
        `6 paths were found and transformed ✨\n${prettyJson.render(
          transformedPathAlias,
          {
            keysColor: 'brightGreen',
            stringColor: 'grey',
          },
        )}`,
      )}`,
    );
  });

  it('should display an error', () => {
    transformTsPaths(undefined as never, { debug: true });

    expect(console.info).toHaveBeenCalledTimes(0);
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(
      `${chalk.cyanBright.underline.bold(
        'ts-paths-transform',
      )} ❌ ${chalk.whiteBright(
        '-',
      )} Cannot convert undefined or null to object`,
    );
  });
});
