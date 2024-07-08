import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parser: tsParser,
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettier.rules,
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
        },
      ],
    },
  },
];
