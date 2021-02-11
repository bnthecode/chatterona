import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, Paper, TextField, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import moment from "moment";
import React from "react";
import "../../utilities";
import {
  validateUrl,
} from "../../utilities";
import clsx from "clsx";
import ChatItem from "./ChatItem";

const styles = (theme) => ({
  "@global": {
    "*::-webkit-scrollbar-thumb": {
      display: "none",
    },
    /* width */
    "::-webkit-scrollbar": {
      display: "none",
    },

    /* Track */
    "::-webkit-scrollbar-track": {
      display: "none",
    },

    /* Handle */
    "::-webkit-scrollbar-thumb": {
      display: "none",
    },

    /* Handle on hover */
    "::-webkit-scrollbar-thumb:hover": {
      display: "none",
    },
  },

  input2: {
    height: 16,
    fontSize: "1rem",
    borderRadius: 8,
    borderWidth: 0,
    outline: 0,
    "&::placeholder": {
      color: "#fff",
    },
    "&:focus": {
      outline: 0,
    },
    color: "#dcddde",
  },
  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: `${theme.palette.primary.main} !important`,
    },
  },

  cssFocused: {},

  notchedOutline: {
    borderWidth: "1px",
    borderColor: "#40444b !important",
  },
  input: {
    backgroundColor: "#40444b",
    width: "calc(100% - 30px)",
    position: "absolute",
    bottom: 0,
    borderRadius: 8,
    color: "#dcddde",
  },
  userTypings: {
    width: 400,
    position: "absolute",
    bottom: 60,
    borderRadius: 8,
    color: "white",
  },
  btn: {
    cursor: "pointer",
    border: "none",
    backgroundColor: "transparent",
    "&:focus": {
      outline: "none",
      border: "none",
      backgroundColor: "transparent",
    },
  },
  icon: {
    color: "#dcddde",
    fontWeight: 400,
    fontSize: 24,
    marginRight: 16,
  },
  link: {
    color: "#2196f3",
  },
});

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.messageRef = React.createRef();
  }
  state = {
    messages: [],
    usersTyping: {},
    messageType: "text",
    message: "",
  };



  addMessageToChannel = async () => {
    // const { message } = this.state;
    this.setState({ userTyping: false, message: "" });
    // const { selectedChannel, selectedServer } = this.props;
    // await messageServices.createMessage(
    //   selectedServer.id,
    //   selectedChannel.id,
    //   message
    // );
  };

  handleTyping = (e) => {
    this.setState({ userTyping: true });
    // const { selectedChannel, user } = this.props;
    // channelService.addUserTyping(selectedChannel.id, user, true);
    this.setState({
      messageType: validateUrl(e.target.value),
      message: e.target.value,
    });
  };

  submitMessage = ({ key }) =>
    key === "Enter" ? this.addMessageToChannel() : null;

  isNewDay = (currentDate, previousDate) => {
    return !moment(currentDate).isSame(previousDate, "day");
  };


  fileHandler = (e) => {
    //??
    // const { message } = this.state;
    // this.setState({ message: { ...message, type: "img" } });
  };

  upload = () => {
    // document.getElementById("upload-message-img").click();
  };

  render() {
    const { messages, message, messageType } = this.state;
    const { classes, selectedChannel } = this.props;
    return (
      <div
        style={{
          position: "relative",
          padding: 8,
          left: 310,
          width: "calc(100% - 515px)",
          height: "calc(100vh - 48px)",
        }}
      >
        <div
          style={{
            position: "relative",
            top: 40,
          }}
        >
          <div
            style={{
              maxHeight: "calc(100vh - 160px)",
              padding: 0,
              overflow: "auto",
            }}
          >
            {messages && messages.length ? (
              messages.map((msg, i) => (
                <div>
                  <Grid item xs={12}>
                    {this.isNewDay(
                      msg.date,
                      messages[i - 1] ? messages[i - 1].date : msg.date
                    ) ? (
                      <Paper
                        elevation={0}
                        square
                        style={{
                          height: 20,
                          textAlign: "center",
                          backgroundColor: "transparent",
                          width: "calc(100% - 30px",
                          borderBottom: "1px solid grey",
                          padding: 8,
                        }}
                      >
                        <Typography
                          style={{
                            color: "grey",
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                        >
                          {moment(msg.date).format("MMMM DD, YYYY")}
                        </Typography>
                      </Paper>
                    ) : (
                      ""
                    )}
                  </Grid>
                  <ChatItem
                    message={msg}
                    messageRef={
                      i === messages.length - 1 ? this.messageRef : null
                    }
                  />
                </div>
              ))
            ) : (
              <Paper
                style={{
                  minHeight: 40,
                  display: "flex",
                  flexDirection: "row",
                  margin: 12,
                  padding: 14,
                  backgroundColor: "#3a4146",
                  width: "80%",
                }}
              >
                <Paper
                  style={{
                    backgroundImage: `url(https://images.unsplash.com/photo-1503797558227-76451ba6de08?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzN8fGdvYXR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60)`,
                    borderRadius: 20,
                    backgroundSize: "contain",
                    height: 40,
                    width: 40,
                  }}
                ></Paper>
                <Typography
                  style={{
                    fontSize: 14,
                    marginLeft: 14,
                    marginTop: 8,
                    color: "white",
                    fontWeight: 600,
                  }}
                >
                  No messages in this channel! Send one to start a conversation.
                </Typography>
              </Paper>
            )}
          </div>
        </div>
        {/* <div style={{ display: "flex", flexDirection: "row" }}>
          <Typography className={classes.userTypings}>
            {this.getUserTypings()}
          </Typography>
        </div> */}

        <TextField
          InputProps={{
            classes: {
              root: classes.cssOutlinedInput,
              input:
                messageType === "link"
                  ? clsx([classes.input2, classes.link])
                  : classes.input2,
              focused: classes.cssFocused,
              notchedOutline: classes.notchedOutline,
            },
            startAdornment: (
              <div style={{ display: "grid" }}>
                <button className={classes.btn} id="plus" onClick={this.upload}>
                  <FontAwesomeIcon
                    className={classes.icon}
                    icon={faPlusCircle}
                  ></FontAwesomeIcon>
                </button>
                <input
                  id="upload-message-img"
                  hidden
                  type="file"
                  onChange={this.fileHandler}
                />
              </div>
            ),
          }}
          style={{ fontSize: "24px" }}
          variant="outlined"
          placeholder={`Message #${
            selectedChannel ? selectedChannel.name : ""
          }`}
          autoFocus
          onKeyPress={this.submitMessage}
          onChange={this.handleTyping}
          value={message}
          className={classes.input}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Chat);
