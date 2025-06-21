export const pathsAlias = {
  '@api': ['libs/front/api/src/main-backend/calls/index.ts'],
  '@api/*': ['libs/front/api/src/main-backend/calls/*'],
  '@components/molecules': ['libs/front/components/src/molecules/index.ts'],
  '@components/molecules/*': ['libs/front/components/src/molecules/*'],
  '@components/organisms': ['libs/front/components/src/organisms/index.ts'],
  '@components/organisms/*': ['libs/front/components/src/organisms/*'],
};

export const transformedPathAlias = {
  '^@api$': 'libs/front/api/src/main-backend/calls/index.ts',
  '^@api/(.*)$': 'libs/front/api/src/main-backend/calls/$1',
  '^@components/molecules$': 'libs/front/components/src/molecules/index.ts',
  '^@components/molecules/(.*)$': 'libs/front/components/src/molecules/$1',
  '^@components/organisms$': 'libs/front/components/src/organisms/index.ts',
  '^@components/organisms/(.*)$': 'libs/front/components/src/organisms/$1',
};

export const transformedPathAliasWithPrefix = {
  '^@api$': '<rootDir>/../../libs/front/api/src/main-backend/calls/index.ts',
  '^@api/(.*)$': '<rootDir>/../../libs/front/api/src/main-backend/calls/$1',
  '^@components/molecules$':
    '<rootDir>/../../libs/front/components/src/molecules/index.ts',
  '^@components/molecules/(.*)$':
    '<rootDir>/../../libs/front/components/src/molecules/$1',
  '^@components/organisms$':
    '<rootDir>/../../libs/front/components/src/organisms/index.ts',
  '^@components/organisms/(.*)$':
    '<rootDir>/../../libs/front/components/src/organisms/$1',
};
