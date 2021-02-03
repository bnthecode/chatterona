import { faHashtag, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { truncateString } from "../utilities";

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

const ChannelListItem = ({setChannel, selected, channel}) => {
  const classes = useStyles();
  return (
    <ListItem
      onClick={() => setChannel(channel)}
      className={classes.channelItem}
      selected={selected}
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
              icon={channel.voice ? faVolumeUp : faHashtag}
            ></FontAwesomeIcon>
            {truncateString(channel.name, 26)}
          </Typography>
        }
      />
    </ListItem>
  );
};

export default ChannelListItem;
