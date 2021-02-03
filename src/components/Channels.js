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
  makeStyles
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import db from "../firebase";
import { setChannelRedux } from "../redux/actions/appActions";
import { channelService } from "../services";
import { truncateString } from "../utilities";
import ChannelHeader from "./ChannelHeader";
import ChannelListItem from "./ChannelListItem";
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
    const fetchChannels = async () => {
      if (selectedServer.id) {
        const channels = await channelService.getChannels(selectedServer.id);
        setChannels(channels);
      }
    };
    fetchChannels();
  }, [selectedServer.id]);

  const handleAddChannel = async () => {
    await channelService.addChannel(selectedServer.id);
    const channels = await channelService.getChannels(selectedServer.id);
    setChannels(channels);
    toggleHeaderOptions();
  };

  const toggleHeaderOptions = () => showHeaderOptions(!headerOptions);

  return (
    <Drawer width="310px" style={{ backgroundColor: "#3b3b3b" }}>
      <div style={{ paddingLeft: "72px" }}>
        <ChannelHeader
          serverName={selectedServer.name}
          toggleHeaderOptions={toggleHeaderOptions}
        />
        <Divider
          style={{ width: "100%", height: 1, backgroundColor: "#1e1e1e" }}
        />
        <Grid container>
          <List style={{ width: "100%", margin: 4 }}>
            {channels ? channels.map((chnl) => (
              <ChannelListItem
                selected={chnl.id === selectedChannel.id}
                setChannel={setChannel}
                channel={chnl}
              />
            )): ''}
          </List>
        </Grid>
        <Paper
          style={{
            position: "absolute",
            backgroundColor: "#282828",
            bottom: 0,
            height: 52,
            width: "calc(100% - 72px)",
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
      <HeaderOptions
        handleAddChannel={handleAddChannel}
        headerOptions={headerOptions}
      />
    </Drawer>
  );
};

export default Channels;
