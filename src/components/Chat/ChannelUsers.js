import {
  makeStyles,
} from "@material-ui/core";

import Drawer from "../Drawer";

const useStyles = makeStyles(() => ({
  drawer: {
      position: 'absolute',
      top: 46,
    width: 200,
    height: 'calc(100vh - 48px)',
    backgroundColor: "#2f3136",
  },
}));

const ChannelUsers = () => {
  const classes = useStyles();
  return <Drawer anchor="right" className={classes.drawer}></Drawer>;
};

export default ChannelUsers;
