import { Config } from '@jest/types';
import { CompilerOptions } from 'typescript';

export type TsPathMapping = Exclude<CompilerOptions['paths'], undefined>;
export type JestPathMapping = Config.InitialOptions['moduleNameMapper'];

export interface TransformTsPathsOptions {
  prefix?: string;
  verbose?: boolean;
}
