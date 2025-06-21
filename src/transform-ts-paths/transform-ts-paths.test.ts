import colors from 'picocolors';
import prettyJson from 'prettyjson';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  pathsAlias,
  transformedPathAlias,
  transformedPathAliasWithPrefix,
} from '../tests/mock-data/paths-alias.mock-data';

import { transformTsPaths } from './transform-ts-paths';

describe('transformTsPaths function', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // biome-ignore lint/suspicious/noEmptyBlockStatements: /
    vi.spyOn(console, 'info').mockImplementation(() => {});
    // biome-ignore lint/suspicious/noEmptyBlockStatements: /
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should transform paths', () => {
    const result = transformTsPaths(pathsAlias, { verbose: true });

    expect(result).toStrictEqual(transformedPathAlias);
  });

  it('should transform paths with a prefix', () => {
    const result = transformTsPaths(pathsAlias, {
      prefix: '<rootDir>/../../',
    });

    expect(result).toStrictEqual(transformedPathAliasWithPrefix);
  });

  it('should transform nothing', () => {
    const result = transformTsPaths({});

    expect(result).toStrictEqual({});
  });

  it('should display nothing when verbose is set to false', () => {
    const paths = {};
    const verbose = false;

    transformTsPaths(paths, { verbose });

    expect(console.error).toHaveBeenCalledTimes(0);
    expect(console.info).toHaveBeenCalledTimes(0);
  });

  it('should display a log when no paths were transformed', () => {
    const paths = {};
    const verbose = true;

    transformTsPaths(paths, { verbose });

    expect(console.error).toHaveBeenCalledTimes(0);
    expect(console.info).toHaveBeenCalledTimes(1);
    expect(console.info).toHaveBeenCalledWith(
      `${colors.cyanBright(
        colors.underline(colors.bold('ts-paths-transform')),
      )} 🤷 ${colors.whiteBright('-')} ${colors.redBright(
        colors.bold('No paths found'),
      )}`,
    );
  });

  it('should display a log when paths were transformed', () => {
    transformTsPaths(pathsAlias, { verbose: true });

    expect(console.error).toHaveBeenCalledTimes(0);
    expect(console.info).toHaveBeenCalledTimes(1);
    expect(console.info).toHaveBeenCalledWith(
      `${colors.cyanBright(
        colors.underline(colors.bold('ts-paths-transform')),
      )} 🚀 ${colors.whiteBright('-')} ${colors.blueBright(
        colors.bold(
          `6 paths were found and transformed ✨\n${prettyJson.render(
            transformedPathAlias,
            {
              keysColor: 'brightGreen',
              stringColor: 'grey',
            },
          )}`,
        ),
      )}`,
    );
  });

  it('should display an error', () => {
    transformTsPaths(undefined as never, { verbose: true });

    expect(console.info).toHaveBeenCalledTimes(0);
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(
      `${colors.cyanBright(
        colors.underline(colors.bold('ts-paths-transform')),
      )} ❌ ${colors.whiteBright(
        '-',
      )} Cannot convert undefined or null to object`,
    );
  });
});
