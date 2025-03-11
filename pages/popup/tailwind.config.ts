import baseConfig from '@extension/tailwindcss-config';
import type { Config } from 'tailwindcss';

import pxToRem from 'tailwindcss-preset-px-to-rem';

export default {
  ...baseConfig,
  presets: [pxToRem],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
} as Config;
