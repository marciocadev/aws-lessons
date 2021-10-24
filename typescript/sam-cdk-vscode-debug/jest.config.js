module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  modulePathIgnorePatterns: ["<rootDir>/test/__mocks__/aws-sdk/clients/dynamodb.ts"]
};
