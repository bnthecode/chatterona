import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {

    primary: {
      light: "#3a4146",
      main: "#2c2f33",
      dark: '#23272a',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#212121',
      main: "#7289da",
      dark: "#23272a"
    }
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'Uni Sans',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  overrides: {
      MuiTooltip: {
        tooltip: {
          fontSize: 12,
          opacity: '.8',
          fontWeight: 700,
          color: "#fff",
          padding: 10,
          backgroundColor: "#202225",
        }
    }
  }
});

export default theme;
