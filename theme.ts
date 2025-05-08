const theme = {
  colors: {
    transparent: 'transparent',
    black: '#000',
    white: '#fff',
    ['brand-main']: '#2424FF',
    ['brand-secondary']: {
      100: '#6666E7',
      200: '#8181FE',
      300: '#B0B0FF',
      400: '#6AD2FF',
      500: '#F4F7FE',
      600: '#91A8E3',
      700: '#DDDDFD',
      800: '#EBEFFB',
    },
    gray: {
      50: '#F4F4F4',
      75: '#E6E6E6',
      100: '#D8D8D8',
      200: '#969696',
      300: '#646464',
    },
    positive: '#DAFFF5',
    negative: '#FFD4D1',
    error: '#EE5D50',
    success: '#05CD99',
    warning: '#FFCE20',
  },
  extend: {
    colors: {
      background: 'var(--background)',
      foreground: 'var(--foreground)',
    },
  },
};

export default theme;
