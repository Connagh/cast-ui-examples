# Cast UI Example Storybook

Demonstrates how to set up your own Storybook with Cast UI components and custom themes using `createTheme()`.

## Setup

```bash
npm install
npm run storybook
```

Opens at `http://localhost:6006`. Use the paintbrush icon in the toolbar to switch between themes.

## How It Works

### Theme Overrides

Custom themes are defined as partial JSON files in `../themes/`:

- `consumer.json` — Violet, Poppins, rounded corners
- `corporate.json` — Blue, Merriweather + Inter, crisp corners
- `luxury.json` — Gold on black, Playfair + Cormorant, sharp edges

Each file only contains values that differ from the Default base theme. At runtime, `createTheme()` deep-merges these overrides with the default:

```ts
import { createTheme, defaultTheme } from '@castui/cast-ui';
import consumerOverrides from '../../themes/consumer.json';

const consumerTheme = createTheme(consumerOverrides);
```

### Storybook Configuration

- **`.storybook/preview.ts`** — Builds themes with `createTheme()` and provides a toolbar dropdown to switch between them
- **`.storybook/preview-head.html`** — Loads Google Fonts for all example themes
- **`.storybook/main.ts`** — Webpack config aliasing `react-native` to `react-native-web`

### Adding Your Own Theme

1. Copy `default.reference.json` from the `@castui/cast-ui` package
2. Modify the values you want to change
3. Save as a JSON file (e.g. `../themes/my-brand.json`)
4. Import and use `createTheme()` in `preview.ts`
5. Add a toolbar item for your theme
