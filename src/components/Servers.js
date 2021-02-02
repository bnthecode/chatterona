import {
  Avatar,
  Button,
  Divider,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Drawer from "./Drawer";
import VideogameAssetIcon from "@material-ui/icons/VideogameAsset";
import AddIcon from "@material-ui/icons/Add";
import db from "../firebase";
import { useEffect, useState } from "react";
import { setServerRedux } from "../redux/actions/appActions";
import { connect } from "react-redux";
const useStyles = makeStyles((theme) => ({
  btn: {
    height: 60,
    width: 60,
    minHeight: 60,
    color: "white",
    borderRadius: "50%",
    backgroundColor: theme.palette.primary.dark,
    margin: 8,
    "&:hover": {
      transition: "all .25s",
      backgroundColor: theme.palette.primary.dark,
      borderRadius: "40%",
    },
  },
}));
const Servers = ({ setServer, serverId }) => {
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
        borderRight: "1px solid #eee",
      }}
      width="85px"
      variant="secondary"
    >
      <Button className={classes.btn}>
        <VideogameAssetIcon />
      </Button>
      <Divider
        style={{
          backgroundColor: "white",
          margin: "0 16px 0 16px",
          height: 1,
          width: "calc(100% - 32px)",
        }}
      />
      {servers.map((svr) => (
        <Button onClick={() => setServer(svr)} className={classes.btn}>
          <Avatar style={{ backgroundColor: "transparent" }}>
            {" "}
            {svr.name.charAt(0)}{" "}
          </Avatar>
        </Button>
      ))}
      <Button className={classes.btn}>
        <AddIcon onClick={addServer} />
      </Button>
    </Drawer>
  );
};

const mapStateToProps = (state) => ({
    serverId: state.app.serverId
})

const mapDispatchToProps = (dispatch) => ({
    setServer: dispatch(setServerRedux),
});
export default connect(mapStateToProps, mapDispatchToProps)(Servers);
