import type { StorybookConfig } from '@storybook/react-vite';

import { resolve } from 'path';
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-tailwind-dark-mode',
  ],
  core: {
    builder: '@storybook/builder-vite',
  },
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal(config: any, { configType }) {
    // customize the Vite config here
    // Object.assign(config.resolve.alias, {
    //   '@': resolve('src'),
    // });
    config.define = { 'process.env.NODE_DEBUG': 'false' };
    // return the customized config
    return config;
  },
};
export default config;
