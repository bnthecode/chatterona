import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#595959",
      dark: '#3d1059',
      light: "#616161",
      contrastText: '#eee'
    },
    secondary: {
      main: "#6a1b9a",
      light: '#212121',
      dark: "#3b3b3b"
    }
  },
});

export default theme;
