module.exports = {
  roots: ['<rootDir>/tests'],
  verbose: true,
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
  testEnvironment: 'node',
  reporters: ['default'],
}
