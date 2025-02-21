/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: ['bg-gray-6'],
  theme: {
    extend: {},

    // Colors
    colors: {
      primary: {
        DEFAULT: '#111940',
        500: '#111940',
        400: '#283053',
        300: '#7E7E8C',
        200: '#A9A9B3',
      },
      secondary: {
        DEFAULT: '#FBB145',
        500: '#FBB145',
        400: '#FCC16A',
        300: '#FDD08F',
        200: '#FDDFB5',
      },
      gray: {
        DEFAULT: '#666666',
        8: '#666666',
        7: '#777777',
        6: '#888888',
        5: '#999999',
        4: '#CCCCCC',
        3: '#DDDDDD',
        2: '#EDEDED',
        1: '#F4F4F4',
      },
      danger: '#EF4800',
      success: '#089728',
      warning: '#EFE612',
      highlight: '#197ECE',
      info: '#0DCAF0',
      neutral: '#F0F2F4',
      'bg-color': {
        DEFAULT: '#EEF2F7',
        1: '#EEF2F7',
        2: '#F9F9FF',
      },
      dark: {
        DEFAULT: '#484A56',
        1: '#484A56',
        2: '#006917',
        3: '#9F3000',
        4: '#06477A',
      },
      light: {
        DEFAULT: '#F0F0FF',
        1: '#F0F0FF',
        2: '#F8F0FF',
        3: '#F1F6FC',
        4: '#FFFEF1',
      },
      black: '#222222',
      white: '#FFFFFF',
      accent: {
        DEFAULT: '#585C71',
        1: '#585C71',
        2: '#0D1434',
      },
      transparent: 'transparent',
    },

    // Typography
    fontFamily: {
      primary: [...defaultTheme.fontFamily.sans],
    },

    fontSize: {
      xs: ['10px', { lineHeight: '12px' }],
      sm: ['12px', { lineHeight: '14.4px' }],
      'label-sm': ['13px', { lineHeight: '15.6px' }],
      label: ['14px', { lineHeight: '16.8px' }],
      'base-1': ['16px', { lineHeight: '19.2px' }],
      'base-2': ['18px', { lineHeight: '21.6px' }],
      lg: ['20px', { lineHeight: '24px' }],
      xl: ['22px', { lineHeight: '26.4px' }],
      '2xl': ['24px', { lineHeight: '28.8px' }], // h6
      '3xl': ['26px', { lineHeight: '31.2px' }], // h5
      '4xl': ['28px', { lineHeight: '33.6px' }], // h4
      '5xl': ['35px', { lineHeight: '42px' }], // h3
      '6xl': ['45px', { lineHeight: '54px' }], // h2
      '7xl': ['54px', { lineHeight: '64.8px' }], // h1
    },

    fontWeight: {
      light: 300,
      normal: 400,
      bold: 600,
      'extra-bold': 700,
    },
  },
  plugins: [],
};




// /** @type {import('tailwindcss').Config} */
// module.exports = {
//     darkMode: ["class"],
//     content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
//   theme: {
//   	extend: {
//   		borderRadius: {
//   			lg: 'var(--radius)',
//   			md: 'calc(var(--radius) - 2px)',
//   			sm: 'calc(var(--radius) - 4px)'
//   		},
//   		colors: {
//   			background: 'hsl(var(--background))',
//   			foreground: 'hsl(var(--foreground))',
//   			card: {
//   				DEFAULT: 'hsl(var(--card))',
//   				foreground: 'hsl(var(--card-foreground))'
//   			},
//   			popover: {
//   				DEFAULT: 'hsl(var(--popover))',
//   				foreground: 'hsl(var(--popover-foreground))'
//   			},
//   			primary: {
//   				DEFAULT: 'hsl(var(--primary))',
//   				foreground: 'hsl(var(--primary-foreground))'
//   			},
//   			secondary: {
//   				DEFAULT: 'hsl(var(--secondary))',
//   				foreground: 'hsl(var(--secondary-foreground))'
//   			},
//   			muted: {
//   				DEFAULT: 'hsl(var(--muted))',
//   				foreground: 'hsl(var(--muted-foreground))'
//   			},
//   			accent: {
//   				DEFAULT: 'hsl(var(--accent))',
//   				foreground: 'hsl(var(--accent-foreground))'
//   			},
//   			destructive: {
//   				DEFAULT: 'hsl(var(--destructive))',
//   				foreground: 'hsl(var(--destructive-foreground))'
//   			},
//   			border: 'hsl(var(--border))',
//   			input: 'hsl(var(--input))',
//   			ring: 'hsl(var(--ring))',
//   			chart: {
//   				'1': 'hsl(var(--chart-1))',
//   				'2': 'hsl(var(--chart-2))',
//   				'3': 'hsl(var(--chart-3))',
//   				'4': 'hsl(var(--chart-4))',
//   				'5': 'hsl(var(--chart-5))'
//   			}
//   		}
//   	}
//   },
//   plugins: [require("tailwindcss-animate")],
// }
