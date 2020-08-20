module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-explicit-any': 0,
  },
  overrides: [
    {
      files: ['./__test__/*-test.ts', './__test__/*.spec.ts'],
      env: {
        node: true,
        jest: true,
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'prettier/@typescript-eslint',
        'plugin:jest/recommended',
      ],
      rules: {
        '@typescript-eslint/no-explicit-any': 0,
      },
    },
    {
      files: ['./scripts/*', './*.js'],
      env: {
        node: true,
      },
      extends: ['eslint:recommended', 'prettier'],
      rules: {
        '@typescript-eslint/no-var-requires': 0,
      },
    },
  ],
}
