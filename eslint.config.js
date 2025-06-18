// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import pluginJson from 'eslint-plugin-jsonc';
import babelParser from '@babel/eslint-parser';
import { defineConfig } from 'eslint/config';

export default defineConfig([
    {
        files: ['**/*.{js,jsx}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: babelParser,
            parserOptions: {
                requireConfigFile: false,
                ecmaFeatures: {
                    jsx: true,
                },
                babelOptions: {
                    plugins: ['@babel/plugin-syntax-jsx'],
                },
            },
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        plugins: {
            react: pluginReact,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...pluginReact.configs.recommended.rules,
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
    {
        files: ['**/*.json'],
        ignores: ['package.json', 'package-lock.json'],
        languageOptions: {
            parser: pluginJson.parser,
        },
        plugins: {
            jsonc: pluginJson,
        },
        rules: {
            'jsonc/auto': 'error',
        },
    },
]);
