module.exports = {
  coveragePathIgnorePatterns: ["/node_modules/", "/tools/"],
  moduleNameMapper: {
    "~(.*)": "<rootDir>/src$1",
  },
  setupFilesAfterEnv: ["<rootDir>/tools/setup-test.js"],
  testEnvironment: "node",
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    process.env.JEST_ENV === "e2e" ? ".*\\.spec.js$" : ".*\\.e2e-spec.js$",
  ],
  testURL: "http://localhost:3001/",
  transform: {
    "^.+\\.js$": "babel-jest",
  },
};

jest.setTimeout(30000);
