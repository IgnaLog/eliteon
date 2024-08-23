module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "js"],
  rootDir: "tests",
  testRegex: ".*\\.test\\.ts$",
  coverageDirectory: "../coverage",
};
