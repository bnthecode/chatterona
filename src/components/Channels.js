import { Typography, Grid, Divider, List, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useEffect, useState } from "react";
import { channelService } from "../services";
import ChannelHeader from "./ChannelHeader";
import ChannelListItem from "./ChannelListItem";
import Drawer from "./Drawer";
import HeaderOptions from "./HeaderOptions";

const useStyles = makeStyles(() => ({
  drawer: { backgroundColor: "#23272a", width: "310px" },
  wrapper: { paddingLeft: "72px" },
  divider: { width: "100%", height: 1, backgroundColor: "#1e1e1e" },
  list: { width: "100%", margin: 4 },
  paper: {
    position: "absolute",
    backgroundColor: "#282828",
    bottom: 0,
    height: 52,
    width: "calc(100% - 72px)",
  },
  bottomPaper: {
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
  userText: {
    position: "absolute",
    top: 14,
    left: 60,
    fontSize: 12,
    color: "white",
    fontWeight: 700,
  },
  nameSpan: {
    whiteSpace: "nowrap",
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
    <Drawer className={classes.drawer} anchor="left">
      <div className={classes.wrapper}>
        <ChannelHeader
          serverName={selectedServer.name}
          toggleHeaderOptions={toggleHeaderOptions}
        />
        <Divider className={classes.divider} />
        <Grid container>
          <List className={classes.list}>
            {channels
              ? channels.map((chnl) => (
                  <ChannelListItem
                    selected={chnl.id === selectedChannel.id}
                    setChannel={setChannel}
                    channel={chnl}
                  />
                ))
              : ""}
          </List>
        </Grid>
        <Paper className={classes.paper}>
          <Paper
            style={{ backgroundImage: `url(${user.photoURL})` }}
            className={classes.bottomPaper}
          >
            <div className={classes.bottomSpacer}></div>
            <Typography variant="body1" className={classes.userText}>
              <span className={classes.nameSpan}>{user.displayName}</span>
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
