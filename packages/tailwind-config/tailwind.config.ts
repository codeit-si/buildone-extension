import type { Config } from 'tailwindcss';

export default {
  theme: {
    extend: {
      colors: {
        'dark-blue': {
          50: '#FAF9FF',
          100: '#F4F4FF',
          200: '#EBE9FF',
          300: '#DDDAFF',
          400: '#7E73FF',
          500: '#6F63FF',
          600: '#5A4CFF',
          700: '#473ADA',
          800: '#3C30C0',
          900: '#2E24A1',
          950: '#281F8B',
        },
        red: {
          500: '#EF4444',
        },
      },
    },
  },
  plugins: [],
} as Omit<Config, 'content'>;
