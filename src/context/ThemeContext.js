import React, { createContext, useState, useMemo, useContext } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeContext = createContext();

export const useThemeMode = () => useContext(ThemeContext);

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
          // Netrivium brand — electric blue + cyan on deep navy.
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
          // Brand display face (Montserrat) for headings; loaded via <link> in index.html.
          h1: { fontFamily: "'Montserrat', sans-serif", fontWeight: 800 },
          h2: { fontFamily: "'Montserrat', sans-serif", fontWeight: 800 },
          h3: { fontFamily: "'Montserrat', sans-serif", fontWeight: 700 },
          h4: { fontFamily: "'Montserrat', sans-serif", fontWeight: 700 },
          h5: { fontFamily: "'Montserrat', sans-serif", fontWeight: 600 },
          h6: { fontFamily: "'Montserrat', sans-serif", fontWeight: 600 },
        },
        shape: {
          borderRadius: 12,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: '8px',
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                boxShadow: mode === 'light'
                  ? '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
                  : '0 1px 3px 0 rgb(0 0 0 / 0.3), 0 1px 2px -1px rgb(0 0 0 / 0.3)',
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
