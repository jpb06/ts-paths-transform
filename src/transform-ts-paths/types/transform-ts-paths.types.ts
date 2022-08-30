import { Config } from '@jest/types';
import { CompilerOptions } from 'typescript';

export type TsPathMapping = Exclude<CompilerOptions['paths'], undefined>;
export type JestPathMapping = Config.InitialOptions['moduleNameMapper'];

export type TransformTsPathsOptions = {
  prefix?: string;
  verbose?: boolean;
};
