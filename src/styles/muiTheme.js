import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#424242",
      dark: '#6a1b9a',
      light: "#616161",
      contrastText: '#eee'
    },
    secondary: {
      main: "#6a1b9a",
      light: '#212121'
    }
  },
});

export default theme;
