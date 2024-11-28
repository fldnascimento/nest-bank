module.exports = {
  moduleNameMapper: {
    '^@domain/(.*)$': '<rootDir>/domain/$1',
    '^@application/(.*)$': '<rootDir>/application/$1',
    '^@infrastructure/(.*)$': '<rootDir>/infrastructure/$1',
    '^@presentation/(.*)$': '<rootDir>/presentation/$1',
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['src/domain/**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  collectCoverageFrom: [
    'domain/**/*.{ts,js}',
    '!domain/**/*.spec.{ts,js}',
    '!domain/**/index.{ts,js}',
  ],
};
