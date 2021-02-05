import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { truncateString } from "../../utilities";

const useStyles = makeStyles((theme) => ({
  channelItem: {
    color: "grey",
    width: "calc(100% - 16px)",
    marginBottom: 4,
    "&:hover": {
      backgroundColor: "#2f3438",
      color: "#fff",
    },
    "&:focus": {
      backgroundColor: "#2f3438",
    },
    marginLeft: 8,
    borderRadius: 6,
  },
  header: {
    color: "grey",
    width: "100%",
    "&:hover": {
      color: "#fff",
    },
    borderRadius: 6,
  },
  selected: {
    color: "white",
    backgroundColor: "#2f3438",
    "&:hover": {
      backgroundColor: "#2f3438",
      color: "#fff",
    },
  },
  iconRight : {
    marginLeft: "auto", '&:hover': {color: "#fff"}, cursor: "pointer"
  }
}));

const ChannelListItem = ({
  selected,
  title,
  iconLeft,
  iconRight,
  onClick,
  header,
  titleStyle
}) => {
  const classes = useStyles();
  const updatedTitle = truncateString(title, 26);
  return (
    <ListItem
      classes={{
        selected: classes.selected,
      }}
      className={header ? classes.header : classes.channelItem}
      selected={selected}
      disableRipple={true}
      dense
      button
    >
      <ListItemText
        onClick={onClick}
        primary={
          <Typography style={{ fontWeight: 600, fontSize: 14 }}>
            <FontAwesomeIcon
              style={{ marginRight: 8 }}
              color="#636363"
              icon={iconLeft}
            ></FontAwesomeIcon>
            <span style={titleStyle}>{updatedTitle}</span>
          </Typography>
        }
      />
   {  iconRight && <Tooltip placement="right" title={iconRight.title}>
        <ListItemIcon>
          <FontAwesomeIcon
            onClick={iconRight.onClick}
            className={classes.iconRight}
            color="#636363"
            icon={iconRight.icon}
          ></FontAwesomeIcon>
        </ListItemIcon>
      </Tooltip>}
    </ListItem>
  );
};

export default ChannelListItem;
