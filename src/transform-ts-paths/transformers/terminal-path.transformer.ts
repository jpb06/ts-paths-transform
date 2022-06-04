import { TransformFunction } from './types/transform-function.type';

export const terminalPath: TransformFunction = (prefix, [key, value]) => ({
  [`^${key}$`]: `${prefix}${value[0]}`,
});
