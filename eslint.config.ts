// eslint.config.js
const { defineConfig } = require("eslint/config");
const globals = require("globals");

module.exports = defineConfig([
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'public/**',
      'webpack.*.js',
    ],
    languageOptions: {
      sourceType: "module",
      globals: {
        ...globals.node,
        require: true,
        module: true,
      },
    },
    rules: {
      "semi": "error",
      "prefer-const": "error",
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      'no-debugger': 'warn',
    },
  },
]);
