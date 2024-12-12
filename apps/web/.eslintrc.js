/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@repo/eslint/next.js'],
  parserOptions: {
    project: true,
  },
};
