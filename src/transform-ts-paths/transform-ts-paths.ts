import { logError, logResult } from './logging/logger';
import { terminalPath, wildcardPath } from './transformers';
import {
  JestPathMapping,
  TransformTsPathsOptions,
  TsPathMapping,
} from './types/transform-ts-paths.types';

export const transformTsPaths = (
  mapping: TsPathMapping,
  { prefix = '', verbose = false }: TransformTsPathsOptions = Object.create(
    null,
  ),
): JestPathMapping => {
  try {
    const paths = Object.entries(mapping)
      .map((path) =>
        path[0].endsWith('/*')
          ? wildcardPath(prefix, path)
          : terminalPath(prefix, path),
      )
      .reduce((prev, curr) => ({ ...prev, ...curr }), {});

    logResult(verbose, paths);

    return paths;
  } catch (err) {
    logError(err);
  }
};
