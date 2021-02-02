import {
  Avatar,
  Button,
  Divider,
  makeStyles,
  Typography,
  Paper,
  Tooltip
} from "@material-ui/core";
import Drawer from "./Drawer";
import VideogameAssetIcon from "@material-ui/icons/VideogameAsset";
import AddIcon from "@material-ui/icons/Add";
import db from "../firebase";
import { useEffect, useState } from "react";
import { setChannelRedux, setServerRedux } from "../redux/actions/appActions";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  btn: {
    height: 40,
    width: 40,
    minHeight: 40,
    color: "#20b673",
    borderRadius: 20,
    backgroundSize: 'contain',
    backgroundColor: theme.palette.secondary.dark,
    margin: 6,
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    "&:hover": {
      transition: "all .25s",
      color: 'white',
      borderRadius: "40%",
    },
  },
}));
const Servers = ({ setServer, setChannel, serverId }) => {
  const [servers, setServers] = useState([]);

  useEffect(async () => {
    const servers = await getServers();
    setServers(servers);
  }, []);

  const getServers = async () => {
    const snapshot = await db.collection("servers").get();
    return snapshot.docs.map((doc) => ({...doc.data(), id: doc.id }));

  };
  const addServer = async () => {
    const serverName = prompt("Enter a name");
    await db.collection("servers").add({
      name: serverName,
      imgUrl: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      country: "USA",
      timestamp: new Date()
    });
    const data = await getServers();

    setServers(data);
  };

  const classes = useStyles();
  return (
    <Drawer
      style={{
          hieght: '100vh',
          overflowY: 'hidden',
        display: "flex",
        alignItems: "center",
        borderRight: "1px solid #1e1e1e",
        backgroundColor: '#1e1e1e'
      }}
      width="85px"
      variant="secondary"
    >
      <div className={classes.btn}>
        <VideogameAssetIcon />
      </div>
      <Divider
        style={{
          backgroundColor: "#1e1e1e",
          margin: "0 16px 0 16px",
          height: 1,
          width: "calc(100% - 32px)",
        }}
      />
      {servers.map((svr) => (
        <Tooltip style={{ fontSize: 12}} placement="right" title={svr.name}>
          <Paper style={{backgroundImage: `url(${svr.imgUrl})` }} onClick={() => [setServer(svr), setChannel({})]} className={classes.btn} >
          </Paper>
          </Tooltip>
      ))}
      <div className={classes.btn}>
        <AddIcon onClick={addServer} />
      </div>
    </Drawer>
  );
};

const mapStateToProps = (state) => ({
    serverId: state.app.serverId
})

const mapDispatchToProps = (dispatch) => ({
    setServer: dispatch(setServerRedux),
    setChannel: dispatch(setChannelRedux),
});
export default connect(mapStateToProps, mapDispatchToProps)(Servers);
