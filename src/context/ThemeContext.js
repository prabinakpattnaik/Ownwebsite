import React, { createContext, useState, useMemo, useContext } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeContext = createContext();

export const useThemeMode = () => useContext(ThemeContext);

const TYPE_SCALE = {
  display: '3rem',
  title: '2.25rem',
  heading: '1.75rem',
  subheading: '1.5rem',
  lead: '1.25rem',
  body: '1rem',
  small: '0.875rem',
  caption: '0.75rem',
};

const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  pill: '50%',
};

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode || 'light';
  });

  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', newMode);
      return newMode;
    });
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'light' ? '#0A5BD3' : '#35D9FF',
            light: mode === 'light' ? '#1B5292' : '#6FEAFF',
            dark: mode === 'light' ? '#08213D' : '#0A5BD3',
            contrastText: mode === 'light' ? '#ffffff' : '#08213D',
          },
          secondary: {
            main: '#00B7E3',
            light: '#35D9FF',
            dark: '#1B5292',
          },
          background: {
            default: mode === 'light' ? '#F4F8FC' : '#08213D',
            paper: mode === 'light' ? '#ffffff' : '#0C2A4A',
          },
          text: {
            primary: mode === 'light' ? '#08213D' : '#EAF2FB',
            secondary: mode === 'light' ? '#4A5B70' : '#9FB6CE',
          },
          divider: mode === 'light' ? 'rgba(8,33,61,0.12)' : 'rgba(234,242,251,0.12)',
        },
        typography: {
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          fontSize: 16,
          htmlFontSize: 16,
          h1: {
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 800,
            fontSize: TYPE_SCALE.title,
            lineHeight: 1.2,
            '@media (min-width:900px)': { fontSize: TYPE_SCALE.display },
          },
          h2: {
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 800,
            fontSize: TYPE_SCALE.heading,
            lineHeight: 1.25,
            '@media (min-width:900px)': { fontSize: TYPE_SCALE.title },
          },
          h3: {
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 700,
            fontSize: TYPE_SCALE.subheading,
            lineHeight: 1.3,
          },
          h4: {
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 700,
            fontSize: TYPE_SCALE.lead,
            lineHeight: 1.35,
          },
          h5: {
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 600,
            fontSize: TYPE_SCALE.lead,
            lineHeight: 1.4,
          },
          h6: {
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 600,
            fontSize: TYPE_SCALE.body,
            lineHeight: 1.4,
          },
          subtitle1: { fontSize: TYPE_SCALE.body, fontWeight: 500, lineHeight: 1.5 },
          subtitle2: { fontSize: TYPE_SCALE.small, fontWeight: 500, lineHeight: 1.57 },
          body1: { fontSize: TYPE_SCALE.body, lineHeight: 1.7 },
          body2: { fontSize: TYPE_SCALE.small, lineHeight: 1.6 },
          button: { fontSize: TYPE_SCALE.body, fontWeight: 600, textTransform: 'none' },
          caption: { fontSize: TYPE_SCALE.caption, lineHeight: 1.5 },
          overline: {
            fontSize: TYPE_SCALE.caption,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          },
        },
        shape: {
          borderRadius: RADIUS.sm,
        },
        components: {
          MuiButton: {
            defaultProps: {
              disableElevation: true,
            },
            styleOverrides: {
              root: {
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: RADIUS.sm,
                fontSize: TYPE_SCALE.body,
                minHeight: 48,
              },
              sizeSmall: {
                fontSize: TYPE_SCALE.small,
                minHeight: 40,
                paddingLeft: 12,
                paddingRight: 12,
              },
              sizeLarge: {
                fontSize: TYPE_SCALE.body,
                minHeight: 48,
                paddingLeft: 24,
                paddingRight: 24,
              },
              containedInherit: {
                backgroundColor: '#ffffff',
                color: '#0A5BD3',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.92)',
                },
              },
              outlinedInherit: {
                borderColor: 'rgba(255, 255, 255, 0.6)',
                color: '#ffffff',
                '&:hover': {
                  borderColor: '#ffffff',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              },
            },
          },
          MuiCard: {
            defaultProps: {
              elevation: 0,
            },
            styleOverrides: {
              root: {
                borderRadius: RADIUS.md,
                border: '1px solid',
                borderColor: mode === 'light' ? 'rgba(8,33,61,0.12)' : 'rgba(234,242,251,0.12)',
                backgroundColor: mode === 'light' ? '#ffffff' : '#0C2A4A',
                boxShadow: mode === 'light'
                  ? '0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.08)'
                  : '0 1px 3px 0 rgb(0 0 0 / 0.3)',
              },
            },
          },
          MuiPaper: {
            defaultProps: {
              elevation: 0,
            },
            styleOverrides: {
              root: {
                borderRadius: RADIUS.md,
                backgroundImage: 'none',
              },
            },
          },
          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                borderRadius: RADIUS.sm,
                minHeight: 48,
                backgroundColor: mode === 'light' ? '#ffffff' : '#0C2A4A',
              },
            },
          },
          MuiChip: {
            styleOverrides: {
              root: {
                borderRadius: RADIUS.sm,
                fontSize: TYPE_SCALE.small,
                fontWeight: 600,
              },
            },
          },
          MuiFab: {
            styleOverrides: {
              root: {
                borderRadius: RADIUS.pill,
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
