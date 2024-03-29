/* eslint-disable no-console */
import chalk from 'chalk';
import prettyJson from 'prettyjson';

import { TransformFunctionResult } from '../transformers/types/transform-function.type';

const header = chalk.cyanBright.underline.bold('ts-paths-transform');

const successHeader = `${header} 🚀 ${chalk.whiteBright('-')}`;
const unknownHeader = `${header} 🤷 ${chalk.whiteBright('-')}`;
const errorHeader = `${header} ❌ ${chalk.whiteBright('-')}`;

export const logResult = (
  verbose: boolean,
  paths: TransformFunctionResult,
): void => {
  if (!verbose) {
    return;
  }

  const pathsCount = Object.entries(paths).length;
  if (pathsCount === 0) {
    console.info(`${unknownHeader} ${chalk.redBright.bold('No paths found')}`);
  } else {
    const transformedPaths = prettyJson.render(paths, {
      keysColor: 'brightGreen',
      stringColor: 'grey',
    });
    console.info(
      `${successHeader} ${chalk.blueBright.bold(
        `${pathsCount} paths were found and transformed ✨\n${transformedPaths}`,
      )}`,
    );
  }
};

export const logError = (err: unknown): void =>
  console.error(
    `${errorHeader} ${
      err ? (err as { message: string }).message : 'Oh no! An error occured'
    }`,
  );
