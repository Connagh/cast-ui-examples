import React from 'react';
import type { Preview } from '@storybook/react-webpack5';
import {
  CastThemeProvider,
  defaultTheme,
  createTheme,
} from '@castui/cast-ui';
import type { CastTheme } from '@castui/cast-ui';

import consumerOverrides from '../../themes/consumer.json';
import corporateOverrides from '../../themes/corporate.json';
import luxuryOverrides from '../../themes/luxury.json';

// ---------------------------------------------------------------------------
// Build custom themes from partial JSON overrides
// ---------------------------------------------------------------------------

const consumerTheme = createTheme(consumerOverrides);
const corporateTheme = createTheme(corporateOverrides);
const luxuryTheme = createTheme(luxuryOverrides);

const THEMES: Record<string, CastTheme> = {
  default: defaultTheme,
  consumer: consumerTheme,
  corporate: corporateTheme,
  luxury: luxuryTheme,
};

// ---------------------------------------------------------------------------
// Preview configuration with theme switcher
// ---------------------------------------------------------------------------

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Switch design system theme',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'default', title: 'Default (Base)' },
          { value: 'consumer', title: 'Consumer' },
          { value: 'corporate', title: 'Corporate' },
          { value: 'luxury', title: 'Luxury' },
        ],
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: {
    theme: 'default',
  },

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  decorators: [
    (Story, context) => {
      const themeName = context.globals.theme || 'default';
      const theme = THEMES[themeName] || defaultTheme;

      const surfaceStyle = {
        backgroundColor: theme.semantic.color.surface,
        padding: 24,
        minHeight: '100%',
      };

      const storyContent = React.createElement(
        'div',
        { style: surfaceStyle },
        React.createElement(Story)
      );

      return React.createElement(
        CastThemeProvider,
        { theme, children: storyContent }
      );
    },
  ],
};

export default preview;
