import { Divider, makeStyles, Paper, Tooltip } from "@material-ui/core";
import Drawer from "./Drawer";
import ServerModal from "./ServerModal";
import VideogameAssetIcon from "@material-ui/icons/VideogameAsset";
import { serverService } from "../services";
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
    backgroundSize: "contain",
    backgroundColor: theme.palette.secondary.dark,
    margin: 6,
    display: "grid",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    "&:hover": {
      transition: "all .25s",
      color: "white",
      borderRadius: "40%",
    },
  },
}));
const Servers = ({ setServer, setChannel, serverId, user }) => {
  const [servers, setServers] = useState([]);


  useEffect(() => {
    const fetchServers = async () => {
      const servers = await serverService.getServers();
      setServers(servers);
    };
    fetchServers();
  }, []);

  const handleAddServer = async (serverName) => {
    const newServer = await serverService.addServer(serverName, user);
    console.log(newServer.id)
    const serverList = await serverService.getServers();
    setServers(serverList)
  }

  const classes = useStyles();
  return (
    <Drawer
      style={{
        hieght: "100vh",
        overflowY: "hidden",
        display: "flex",
        alignItems: "center",
        borderRight: "1px solid #1e1e1e",
        backgroundColor: "#1e1e1e",
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
        <Tooltip style={{ fontSize: 12 }} placement="right" title={svr.name}>
          <Paper
            style={{ backgroundImage: `url(${svr.imgUrl})` }}
            onClick={() => [setServer(svr), setChannel({})]}
            className={classes.btn}
          ></Paper>
        </Tooltip>
      ))}
      <ServerModal handleAddServer={handleAddServer} />
    </Drawer>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  serverId: state.app.serverId,
});

const mapDispatchToProps = (dispatch) => ({
  setServer: dispatch(setServerRedux),
  setChannel: dispatch(setChannelRedux),
});
export default connect(mapStateToProps, mapDispatchToProps)(Servers);
