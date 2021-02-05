import {
  Typography,
  Grid,
  Divider,
  List,
  Paper,
  Collapse,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useEffect, useState } from "react";
import { channelService } from "../../services";
import ChannelHeader from "./ChannelHeader";
import ChannelListItem from "./ChannelListItem";
import CreateChannelDialog from "./CreateChannelDialog";
import Drawer from "../Drawer";
import HeaderOptions from "./HeaderOptions";
import {
  faChevronDown,
  faChevronRight,
  faHashtag,
  faPlus,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles(() => ({
  drawer: { backgroundColor: "#23272a", width: "310px" },
  wrapper: { paddingLeft: "72px" },
  divider: { width: "100%", height: 1, backgroundColor: "#1e1e1e" },
  list: { width: "100%", margin: 4 },
  paper: {
    position: "absolute",
    backgroundColor: "#282828",
    bottom: 0,
    padding: 8,
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
    left: 50,
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
  const [openDropdowns, setDropdownsOpen] = useState({
    text: false,
    voice: false,
  });
  const [showChannelDialog, setChannelDialogOpen] = useState(false);

  useEffect(() => {
    const fetchChannels = async () => {
      if (selectedServer.id) {
        const channels = await channelService.getChannels(selectedServer.id);
        setChannels(channels);
        if(channels[0]){
        setChannel(channels[0]);
        setDropdownsOpen({ ...openDropdowns, [channels[0].type]: true})
        }

      }
    };
    fetchChannels();
  }, [selectedServer.id]);// eslint-disable-line react-hooks/exhaustive-deps

  const toggleDropdown = (type) => {
    setDropdownsOpen({
      ...openDropdowns,
      [type]: !openDropdowns[type],
    });
  };

  const handleAddChannel = async (channel) => {
    await channelService.addChannel(selectedServer.id, channel);
    const channels = await channelService.getChannels(selectedServer.id);
    setChannels(channels);
    setChannel(channels.find(chnl => chnl.name === channel.name));
    setChannelDialogOpen({ open: false})
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
            <ChannelListItem
              header
              iconLeft={openDropdowns["text"] ? faChevronDown : faChevronRight}
              iconRight={{
                icon: faPlus,
                title: "Create Channel",
                onClick: () => setChannelDialogOpen({type: 'text', open: true}),
              }}
              title="TEXT CHANNELS"
              titleStyle={{ fontSize: 12}}
              onClick={() => toggleDropdown("text")}
            />
            <Collapse in={openDropdowns["text"]} timeout={200}>
              {channels
                ? channels
                    .filter((chnl) => chnl.type === 'text')
                    .map((chnl) => (
                      <ChannelListItem
                        selected={chnl.id === selectedChannel.id}
                        iconLeft={chnl.type === 'voice' ? faVolumeUp : faHashtag}
                        onClick={() => setChannel(chnl)}
                        title={chnl.name}
                      />
                    ))
                : ""}
            </Collapse>
            <ChannelListItem
              header
              iconLeft={openDropdowns["voice"] ? faChevronDown : faChevronRight}
              iconRight={{
                icon: faPlus,
                title: "Create Channel",
                onClick: () => setChannelDialogOpen({type: 'voice', open: true}),
              }}
              title="VOICE CHANNELS"
              titleStyle={{ fontSize: 12}}
              onClick={() => toggleDropdown("voice")}
            />
            <Collapse in={openDropdowns["voice"]} timeout={200}>
              {channels
                ? channels
                .filter((chnl) => chnl.type === 'voice')
                    .map((chnl) => (
                      <ChannelListItem
                        selected={chnl.id === selectedChannel.id}
                        iconLeft={chnl.voice ? faVolumeUp : faHashtag}
                        onClick={() => setChannel(chnl)}
                        title={chnl.name}
                      />
                    ))
                : ""}
            </Collapse>
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
      <CreateChannelDialog
        showChannelDialog={showChannelDialog}
        handleAddChannel={handleAddChannel}
        setChannelDialogOpen={setChannelDialogOpen}
      />
    </Drawer>
  );
};

export default Channels;
