import type {StorybookConfig} from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    '@storybook/addon-webpack5-compiler-babel',
    '@chromatic-com/storybook'
  ],

  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },

  docs: {},

  typescript: {
    reactDocgen: 'react-docgen-typescript'
  }
};
export default config;
