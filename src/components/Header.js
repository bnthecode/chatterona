import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { connect } from "react-redux";
import { Divider, Typography } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { truncateString } from "../utilities";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "absolute",
    top: 0,
    width: "calc(100% - 312px)",
    left: 312,
  },
  appbar: {
    height: 46,
  },
  headerText: {
    color: "white",
    fontSize: 14,
    fontWeight: 800,
  },
  headerIcon: {
    marginRight: 10,
  },
  dividerWrapper: {
    width: 20,
    marginBottom: 22,
  },
  divider: {
    height: 20,
    width: 2,
    backgroundColor: "white",
  },
  subHeaderWrapper: {
    width: 100, marginBottom: 20
  },
  subHeaderText: {
    color: "grey",
    fontSize: 14,
    fontWeight: 700,
  },
}));

const Header = ({ selectedChannel }) => {
  const classes = useStyles();

  const renderSelectedChannel = () => {
    return selectedChannel.name ? (
      <>
        <div style={{ marginBottom: 22, marginRight: 16 }}>
          <Typography className={classes.headerText} variant="body1">
            <FontAwesomeIcon
              className={classes.headerIcon}
              color="white"
              icon={selectedChannel.voice ? faVolumeUp : faHashtag}
            ></FontAwesomeIcon>
            {selectedChannel.name}
          </Typography>
        </div>
        <div className={classes.dividerWrapper}>
          <Divider className={classes.divider} />
        </div>
        <div className={classes.subHeaderWrapper}>
          <Typography className={classes.subHeaderText} variant="body1">
            {selectedChannel.description
              ? truncateString(selectedChannel.description, 12)
              : "No description"}
          </Typography>
        </div>
      </>
    ) : (
      ""
    );
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position="static">
        <Toolbar>{renderSelectedChannel()}</Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedChannel: state.app.selectedChannel,
});

export default connect(mapStateToProps, null)(Header);
