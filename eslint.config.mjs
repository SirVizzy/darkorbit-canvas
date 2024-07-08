import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import importPlugin from "eslint-plugin-import";
import stylisticJs from "@stylistic/eslint-plugin-js";
import boundariesPlugin from "eslint-plugin-boundaries";
import tsParser from "@typescript-eslint/parser";

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
      stylistic: stylisticJs,
      import: importPlugin,
      boundaries: boundariesPlugin,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...prettier.rules,
      ...boundariesPlugin.configs.recommended.rules,
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
        },
      ],
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            {
              from: "server",
              disallow: ["client"],
              message:
                "Do not import from client into server. Use @common instead.",
            },
            {
              from: "client",
              disallow: ["server"],
              message:
                "Do not import from server into client. Use @common instead.",
            },
          ],
        },
      ],
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
      },
      "boundaries/elements": [
        {
          type: "server",
          pattern: ["server"],
        },
        {
          type: "client",
          pattern: ["client"],
        },
      ],
    },
  },
];
