import { TransformFunction } from './types/transform-function.type';

export const wildcardPath: TransformFunction = (prefix, [key, value]) => ({
  [`^${key.replace('/*', '/(.*)')}$`]: `${prefix}${value[0].replace(
    '/*',
    '/$1',
  )}`,
});
