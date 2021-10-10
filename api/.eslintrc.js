module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [],
  rules: {
    'linebreak-style': 0,
    'react/destructuring-assignment': 'warn',
    'no-plusplus': 'off',
    'no-console': 'off',
    'react/jsx-curly-brace-presence': 'warn',
  },
};
