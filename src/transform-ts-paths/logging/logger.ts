/* eslint-disable no-console */
import chalk from 'chalk';
import prettyJson from 'prettyjson';

import { TransformFunctionResult } from '../transformers/types/transform-function.type';

const header = chalk.cyanBright.underline.bold('ts-paths-transform');

const successHeader = `${header} 🚀 ${chalk.whiteBright('-')}`;
const unknownHeader = `${header} 🤷 ${chalk.whiteBright('-')}`;
const errorHeader = `${header} ❌ ${chalk.whiteBright('-')}`;

export const logResult = (
  debug: boolean,
  paths: TransformFunctionResult,
): void => {
  const pathsCount = Object.entries(paths).length;

  if (pathsCount === 0) {
    console.info(`${unknownHeader} ${chalk.redBright.bold('No paths found')}`);
  } else {
    const pathsDebug = debug
      ? prettyJson.render(paths, {
          keysColor: 'brightGreen',
          stringColor: 'grey',
        })
      : '';
    console.info(
      `${successHeader} ${chalk.blueBright.bold(
        `${pathsCount} paths were found and transformed ✨\n${pathsDebug}`,
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
