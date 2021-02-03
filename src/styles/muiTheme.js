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
});

export default theme;
