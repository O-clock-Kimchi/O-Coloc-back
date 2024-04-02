/* eslint-disable quote-props */
/* eslint-disable indent */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    "indent": [
      "error",
      4
  ],
  "semi": [
      "error",
      "always"
  ],
  "no-multi-spaces": "error",
  "no-trailing-spaces": "error",
  "eol-last": "error"
  },
};
