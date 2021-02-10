import {
  makeStyles, Paper, Typography,
} from "@material-ui/core";

import Drawer from "../Drawer";

const useStyles = makeStyles(() => ({
  drawer: {
      position: 'absolute',
      top: 46,
    width: 200,
    alignItems: 'center',
    height: 'calc(100vh - 48px)',
    backgroundColor: "#2f3136",
  },
  nameSpan: {
    whiteSpace: "nowrap",
  },
  bottomSpacer: {
    height: 12,
    width: 12,
    position: "absolute",
  
    bottom: 0,
    left: 24,
    border: "1px solid black",
    backgroundColor: "#20b673",
    borderRadius: 6,
  },
  userItem: {
    color: 'white',
    width: '90%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    backgroundColor: "#2f3136",
  },
  bottomPaper: {
    position: "relative",
    minHeight: 40,
    borderRadius: 20,
    backgroundSize: "contain",

    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    cursor: "pointer",
    height: 40,
    width: 40,
  },
  userText: {
    position: "absolute",
    top: 14,
    left: 50,
    fontSize: 12,
    color: "white",
    fontWeight: 700,
  },
}));

const ServerUsers = ({ selectedServer }) => {
  // filter by status
  const users = Object.values(selectedServer.users);
  const classes = useStyles();
  return <Drawer anchor="right" className={classes.drawer}>
    { users.map((user) => <Paper elevation={0} className={classes.userItem}>

    <Paper
            style={{ backgroundImage: `url(${user.photoURL})` }}
            className={classes.bottomPaper}
  
          >
            <div className={classes.bottomSpacer}></div>
            <Typography variant="body1" className={classes.userText}>
              <span className={classes.nameSpan}>{user.displayName}</span>
            </Typography>
          </Paper>
    </Paper>)}
  </Drawer>;
};

export default ServerUsers;
