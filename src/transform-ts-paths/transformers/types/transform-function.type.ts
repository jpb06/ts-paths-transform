export type TransformFunctionResult = Record<string, string>;

export type TransformFunction = (
  prefix: string,
  path: [string, string[]],
) => TransformFunctionResult;
