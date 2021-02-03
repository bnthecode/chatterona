import {
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Paper, Typography } from "@material-ui/core";
import { Album } from "@material-ui/icons";

const ChannelHeader = ({ serverName, toggleHeaderOptions }) => {
  return (
    <Paper
      elevation={0}
      onClick={toggleHeaderOptions}
      style={{
        cursor: "pointer",
        position: "relative",
        height: 40,
        backgroundColor: "#3b3b3b",
        borderBottom: "1px solid #1e1e1e",
      }}
    >
      <Album
        style={{
          position: "absolute",
          color: "white",
          left: 12,
          top: "calc(50% - 10px)",
          margin: "2px 6px 0px 12px",
          fontSize: 14,
        }}
      ></Album>
      <Typography
        style={{
          position: "absolute",
          top: "calc(50% - 12px)",
          left: 46,
          color: "white",
          fontSize: 14,
          fontWeight: 800,
        }}
      >
        {serverName}
      </Typography>
      <FontAwesomeIcon
        icon={faChevronDown}
        style={{
          position: "absolute",
          top: "calc(50% - 8px)",
          right: 18,
          color: "white",
          fontSize: 14,
        }}
      ></FontAwesomeIcon>
    </Paper>
  );
};

export default ChannelHeader;
