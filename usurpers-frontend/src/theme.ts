import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196f3', // Blue
    },
    secondary: {
      main: '#9c27b0', // Purple
    },
    background: {
      default: '#181a20',
      paper: '#23263a',
    },
  },
  typography: {
    fontFamily: 'Orbitron, Rajdhani, Roboto, Arial, sans-serif',
    h4: {
      letterSpacing: '2px',
      fontWeight: 700,
      textTransform: 'uppercase',
    },
    h6: {
      letterSpacing: '1px',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 0 24px 2px #2196f355, 0 0 8px 1px #9c27b055',
          border: '1px solid #23263a',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'uppercase',
          fontWeight: 700,
          letterSpacing: '1px',
          boxShadow: '0 0 8px 1px #2196f355',
        },
      },
    },
  },
});

export default theme; 