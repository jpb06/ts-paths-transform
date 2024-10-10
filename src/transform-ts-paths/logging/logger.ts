import colors from 'picocolors';
import prettyJson from 'prettyjson';

import { TransformFunctionResult } from '../transformers/types/transform-function.type';

const header = colors.cyanBright(
  colors.underline(colors.bold('ts-paths-transform')),
);

const successHeader = `${header} 🚀 ${colors.whiteBright('-')}`;
const unknownHeader = `${header} 🤷 ${colors.whiteBright('-')}`;
const errorHeader = `${header} ❌ ${colors.whiteBright('-')}`;

export const logResult = (
  verbose: boolean,
  paths: TransformFunctionResult,
): void => {
  if (!verbose) {
    return;
  }

  const pathsCount = Object.entries(paths).length;
  if (pathsCount === 0) {
    console.info(
      `${unknownHeader} ${colors.redBright(colors.bold('No paths found'))}`,
    );
  } else {
    const transformedPaths = prettyJson.render(paths, {
      keysColor: 'brightGreen',
      stringColor: 'grey',
    });
    console.info(
      `${successHeader} ${colors.blueBright(
        colors.bold(
          `${pathsCount} paths were found and transformed ✨\n${transformedPaths}`,
        ),
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
