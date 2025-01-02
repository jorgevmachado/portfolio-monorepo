import type { StorybookConfig } from '@storybook/react-webpack5';

import { dirname, join } from 'path';
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}

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
    getAbsolutePath('@storybook/addon-webpack5-compiler-swc'),
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-interactions'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-webpack5'),
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
              implementation: require('sass'),
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
