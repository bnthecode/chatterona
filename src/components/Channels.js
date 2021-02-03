import { faHashtag, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Typography,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  makeStyles,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import db from "../firebase";
import { setChannelRedux } from "../redux/actions/appActions";
import { truncateString } from "../utilities";
import ChannelHeader from "./ChannelHeader";
import Drawer from "./Drawer";
import HeaderOptions from "./HeaderOptions";

const useStyles = makeStyles((theme) => ({
  channelItem: {
    color: "white",
    width: "100%",
    "&:hover": {
      backgroundColor: "#4f4f4f",
    },
    "&:focus": {
      backgroundColor: "#4f4f4f",
    },
    borderRadius: 6,
  },
}));

const Channels = ({ selectedServer, setChannel, selectedChannel, user }) => {
  const classes = useStyles();



  const [channels, setChannels] = useState([]);
  const [headerOptions, showHeaderOptions] = useState(false);

  useEffect(() => {

    const gatherChannelData = async () => {
      const snapshot = await db
        .collection("channels")
        .where("serverId", "==", selectedServer.id)
        .get();
      return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    };

    const fetchChannels = async () => {
      if (selectedServer.id) {
        const channels = await gatherChannelData();
        setChannels(channels);
      }
    };
    fetchChannels();
  }, [selectedServer.id]);

  const getChannels = async () => {
    const snapshot = await db
      .collection("channels")
      .where("serverId", "==", selectedServer.id)
      .get();
    return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  };

  const addChannel = async () => {
    const name = prompt("What do you want you your channel to be named?");
    await db.collection("channels").add({
      serverId: selectedServer.id,
      name: name,
      timestamp: new Date(),
      messages: [],
      voice: true,
    });
    const channels = await getChannels();
    setChannels(channels);
    toggleHeaderOptions();
  };

  const toggleHeaderOptions = () => showHeaderOptions(!headerOptions);

  return (
    <Drawer width="360px" style={{ backgroundColor: "#3b3b3b" }}>
      <div style={{ paddingLeft: "86px" }}>
        <ChannelHeader
          serverName={selectedServer.name}
          toggleHeaderOptions={toggleHeaderOptions}
        />
        <Divider
          style={{ width: "100%", height: 1, backgroundColor: "#1e1e1e" }}
        />
        <Grid container>
          <List style={{ width: "100%", margin: 4 }}>
            {channels.map((chnl) => (
              <ListItem
                onClick={() => setChannel(chnl)}
                className={classes.channelItem}
                selected={chnl.id === selectedChannel.id}
                disableRipple={true}
                dense
                button
              >
                <ListItemText
                  primary={
                    <Typography style={{ fontWeight: 600, fontSize: 14 }}>
                      <FontAwesomeIcon
                        style={{ marginRight: 8 }}
                        color="#636363"
                        icon={chnl.voice ? faVolumeUp : faHashtag}
                      ></FontAwesomeIcon>
                      {truncateString(chnl.name, 26)}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Paper
          style={{
            position: "absolute",
            backgroundColor: "#282828",
            bottom: 0,
            height: 50,
            width: "calc(100% - 86px)",
          }}
        >
          <Paper
            style={{
              backgroundImage: `url(${user.photoURL})`,
              position: "relative",
              minHeight: 40,
              borderRadius: 20,
              backgroundSize: "contain",
              margin: 6,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              cursor: "pointer",
              height: 40,
              width: 40,
            }}
          >
            <div
              style={{
                height: 12,
                width: 12,
                position: "absolute",
                bottom: 0,
                left: 24,
                border: "1px solid black",
                backgroundColor: "#20b673",
                borderRadius: 6,
              }}
            ></div>
            <Typography
              variant="body1"
              style={{
                position: "absolute",
                top: 14,
                left: 60,
                fontSize: 12,
                color: "white",
                fontWeight: 800,
              }}
            >
              <span style={{ whiteSpace: "nowrap" }}>{user.displayName}</span>
            </Typography>
          </Paper>
        </Paper>
      </div>
      <HeaderOptions addChannel={addChannel} headerOptions={headerOptions} />
    </Drawer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setChannel: dispatch(setChannelRedux),
});

const mapStateToProps = (state) => ({
  selectedServer: state.app.selectedServer,
  selectedChannel: state.app.selectedChannel,
  user: state.auth.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(Channels);
