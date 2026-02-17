import type { StorybookConfig } from '@storybook/react-webpack5';
import type { Configuration } from 'webpack';

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-webpack5-compiler-swc',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  framework: '@storybook/react-webpack5',
  core: {
    disableTelemetry: true,
  },
  webpackFinal: async (config: Configuration) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        'react-native$': 'react-native-web',
      };

      config.resolve.extensions = [
        '.web.tsx',
        '.web.ts',
        '.web.js',
        '.tsx',
        '.ts',
        '.js',
        ...(config.resolve.extensions || []),
      ];
    }
    return config;
  },
};

export default config;
