const projectConfig = (name) => ({
  displayName: `@graphql-markdown/${name}`,
  rootDir: `./packages/${name}`,
  roots: ["<rootDir>/src/", "<rootDir>/tests/", "<rootDir>/tests/__mocks__"],
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.test.json",
      },
    ],
  },
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  testMatch: ["<rootDir>/tests/(unit|integration)/**/(*.)+(spec|test).ts"],
  moduleNameMapper: {
    "@graphql-markdown/(.*)$": "<rootDir>/../$1/src",
  },
});

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  rootDir: "../",
  preset: "ts-jest",
  collectCoverage: true,
  coverageReporters: ["json", "lcov"],
  moduleFileExtensions: ["ts", "js"],
  projects: [
    projectConfig("core"),
    projectConfig("diff"),
    projectConfig("docusaurus"),
    projectConfig("graphql"),
    projectConfig("helpers"),
    projectConfig("logger"),
    projectConfig("printer-legacy"),
    projectConfig("utils"),
    projectConfig("nest"),
  ],
};
