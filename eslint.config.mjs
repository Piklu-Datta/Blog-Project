import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    ignores: ["node_modules", "dist"],
    languageOptions: {
      globals: {
        ...globals.browser,
        process: "readonly", // Define `process` here
      },
    },
    rules: {
      "no-unused-vars": "error",
      "no-unused-expressions": "error",
      "prefer-const": "error",
      "no-console": "warn",
      "no-undef": "error",
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
