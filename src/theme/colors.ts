import globalTheme from '../../theme';

const palette = {
  primary: {
    main: globalTheme.colors['brand-main'],
  },
  secondary: {
    main: globalTheme.colors['brand-secondary'][100],
    light: globalTheme.colors['brand-secondary'][200],
  },
  error: {
    main: globalTheme.colors.error,
  },
  success: {
    main: globalTheme.colors.success,
  },
  warning: {
    main: globalTheme.colors.warning,
  },
};

export default palette;
