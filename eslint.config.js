import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import pluginCypress from 'eslint-plugin-cypress/flat';
import jestPlugin from 'eslint-plugin-jest';

export default [
  { ignores: [
      'coverage/**',
      'build/**',
      'dist/**',
      'node_modules/**',
      'cypress/videos/**',
      'cypress/screenshots/**',
  ] },
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },

  // --- CommonJS files ---
  {
    files: ['tailwind.config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      sourceType: 'commonjs',
    },
  },

  // --- CYPRESS ---
  {
    ...pluginCypress.configs.recommended,
    files: ['cypress/**/*.js'],
  },
  // --- JEST ---
  {
    files: ['**/*.test.js', '**/*.test.jsx'],
    ...jestPlugin.configs['flat/recommended'],
  },
]
