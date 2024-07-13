module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "check-file", "eslint-plugin-import"],
  rules: {
    "import/no-default-export": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "check-file/folder-naming-convention": [
      "error",
      {
        "src/**/": "KEBAB_CASE",
      },
    ],
  },
  overrides: [
    {
      excludedFiles: ["src/**/*.d.ts"],
      files: ["src/**/*"],
      rules: {
        "check-file/filename-naming-convention": [
          "error",
          {
            "**/*": "KEBAB_CASE",
          },
        ],
      },
    },
  ],
};
