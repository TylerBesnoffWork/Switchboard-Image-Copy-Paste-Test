import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import pluginReact from "eslint-plugin-react";
import pluginJsxA11y from "eslint-plugin-jsx-a11y";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginImport from "eslint-plugin-import";
import prettierConfig from "eslint-config-prettier";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], // Specify file types
    languageOptions: {
      parser: tsParser, // Use TypeScript parser
      ecmaVersion: 2021, // Latest ECMAScript standard
      sourceType: "module", // Use ES Modules
      globals: globals.browser, // Enable browser globals
      ecmaFeatures: {
        jsx: true, // Enable JSX
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      react: pluginReact,
      "jsx-a11y": pluginJsxA11y,
      "react-hooks": pluginReactHooks,
      import: pluginImport,
    },
    rules: {
      ...pluginJs.configs.recommended.rules, // Base JS rules
      ...tseslint.configs.recommended.rules, // TypeScript rules
      ...pluginReact.configs.recommended.rules, // React rules
      ...pluginReactHooks.configs.recommended.rules, // React Hooks rules
      ...pluginJsxA11y.configs.recommended.rules, // Accessibility checks
      ...pluginImport.configs.recommended.rules, // Import rules
      "react/react-in-jsx-scope": "off", // Not needed with React 17+
      "@typescript-eslint/explicit-module-boundary-types": "off", // Disable return type enforcement
    },
  },
  {
    rules: {
      ...prettierConfig.rules, // Prettier integration (disable conflicting rules)
    },
  },
  {
    extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:@typescript-eslint/recommended",
      "prettier" // Disables conflicting ESLint rules
    ],
  }
];
