export type TransformFunctionResult = {
  [x: string]: string;
};

export type TransformFunction = (
  prefix: string,
  path: [string, string[]],
) => TransformFunctionResult;
