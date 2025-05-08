'use client';

// MUI global theme

import { createTheme } from '@mui/material/styles';

import globalTheme from '../../theme';

import palette from './colors';

const theme = createTheme({
  palette,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          height: 44,
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
          padding: '10px 18px',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 600,
          marginBottom: 6,
          color: 'black',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { size: 'small' },
              style: {
                height: 24,
              },
            },
          ],
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: 18,
          fontWeight: 600,
          paddingBottom: 20,
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          paddingBottom: 24,
          paddingLeft: 24,
          paddingRight: 24,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: globalTheme.colors['brand-secondary'][100],
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: 16,
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          gap: 8,
        },
        grouped: {
          backgroundColor: globalTheme.colors['brand-secondary'][700],
          borderColor: globalTheme.colors['brand-secondary'][600],
          borderWidth: 2,
          borderRadius: 8,
          width: 44,
          height: 44,
          '.MuiSvgIcon-root': {
            fill: globalTheme.colors['brand-secondary'][600],
          },
          '&.Mui-selected': {
            backgroundColor: globalTheme.colors['brand-main'],
            borderColor: globalTheme.colors['brand-main'],
            '&:hover': {
              backgroundColor: globalTheme.colors['brand-main'],
              borderColor: globalTheme.colors['brand-main'],
            },
            '.MuiSvgIcon-root': {
              fill: 'white',
            },
          },
        },
      },
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          maxHeight: 100,
          width: 100,
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          '&:hover': {
            backgroundColor: globalTheme.colors['brand-secondary'][500],
            color: globalTheme.colors['brand-main'],
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 36,
          height: 20,
          padding: 2,
          '& .MuiSwitch-switchBase': {
            padding: 0,
            margin: 2,
            transitionDuration: '300ms',
            '&.Mui-checked': {
              transform: 'translateX(16px)',
              color: '#fff',
              '& + .MuiSwitch-track': {
                backgroundColor: globalTheme.colors.success,
                opacity: 1,
                border: 0,
              },
              '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
              },
            },
            '&.Mui-focusVisible .MuiSwitch-thumb': {
              color: globalTheme.colors.success,
              border: '6px solid #fff',
            },
            '&.Mui-disabled .MuiSwitch-thumb': {
              color: globalTheme.colors.gray[200],
            },
            '&.Mui-disabled + .MuiSwitch-track': {
              opacity: 0.7,
            },
          },
          '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: 16,
            height: 16,
          },
          '& .MuiSwitch-track': {
            borderRadius: 26 / 2,
            backgroundColor: globalTheme.colors.gray[200],
            opacity: 1,
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
  },
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
});

export default theme;
