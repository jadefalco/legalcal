import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  roots: ["<rootDir>/tests/api", "<rootDir>/tests/snapshots", "<rootDir>/tests/cron"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
        tsconfig: {
          jsx: "react-jsx",
        },
      },
    ],
  },
  extensionsToTreatAsEsm: [".ts"],
  testMatch: ["**/*.spec.ts"],
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
};

export default config;
