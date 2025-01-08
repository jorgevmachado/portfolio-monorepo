import type { StorybookConfig } from '@storybook/react-webpack5';

import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";

import sass from 'sass';

const currentBrand = process.env.BRAND || 'geek';

const brand = currentBrand.replace(/\s/g, '');

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  typescript: {
    reactDocgen: false,
    reactDocgenTypescriptOptions: {
      tsconfigPath: '../tsconfig.json'
    }
  },
  addons: [
    '@storybook/addon-webpack5-compiler-swc',
    '@storybook/addon-onboarding',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  webpackFinal: async (config) => {
    if(config?.resolve?.plugins) {
      config.resolve.plugins = [ new TsconfigPathsPlugin()];
    }
    if(config?.module?.rules) {
      config.module.rules.push({
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: `
              @import "~@repo/tokens/dist/${brand}/css/_variables.css";
              @import "~@repo/tokens/dist/${brand}/scss/_variables.scss";
            `,
              implementation: sass,
            }
          }
        ]
      })
    }
    return config;
  },
  docs: {
    autodocs: true
  }
};
export default config;
