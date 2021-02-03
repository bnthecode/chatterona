import { Paper, TextField, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React from "react";
import db, { firestore } from "../firebase";

const styles = () => ({
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
    height: 14,
    borderRadius: 8,
    borderWidth: 0,
    "&::placeholder": {
      color: "#fff",
    },
    color: "white",
  },
  input: {
    backgroundColor: "#3a4146",
    width: "calc(100% - 30px)",
    position: "absolute",
    bottom: 0,
    borderRadius: 8,
  },
});

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.messageRef = React.createRef();
  }
  state = {
    messages: [],
    input: "",
  };

  componentDidMount = () => {
    const { selectedChannel } = this.props;
    this.registerChannelListener(selectedChannel.id);
  };

  componentDidUpdate = (prevProps) => {
    const { selectedChannel } = this.props;
    if (prevProps.selectedChannel.id !== selectedChannel.id) {
      this.registerChannelListener(selectedChannel.id);
    }
  };

  registerChannelListener = (channelId) => {
    db.collection("channels")
      .doc(channelId)
      .onSnapshot((doc) => {
        const { messages } = doc.data();
        this.updateMessages(messages);
        if (this.messageRef && this.messageRef.current) {
          this.messageRef.current.scrollIntoView({ behavior: "smooth" });
        }
      });
  };

  updateMessages = (messages) => this.setState({ messages });

  addMessageToChannel = async () => {
    const { input } = this.state;
    const { selectedChannel, user } = this.props;
    const dbRef = db.collection("channels").doc(selectedChannel.id);
    const newMsg = {
      when: new Date(),
      content: input,
      date: new Date(),
      author: { photoURL: user.photoURL, name: user.displayName },
    };
    dbRef.update({
      messages: firestore.FieldValue.arrayUnion(newMsg),
    });
  };

  handleTyping = (e) => {
    let input = e.target.value;
    this.setState({ input: input });
  };

  submitMessage = (e) => {
    if (e.key === "Enter") {
      this.setState({ input: "" });
      return this.addMessageToChannel();
    }
  };

  render() {
    const { messages, input } = this.state;
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
                <Paper
                  elevation={0}
                  ref={i === messages.length - 1 ? this.messageRef : null}
                  style={{
                    minHeight: 40,

                    display: "flex",
                    justifyContent: "flex-start",
                    flexDirection: "row",
                    padding: 14,
                    backgroundColor: "transparent",
                    overflowY: "auto",
                    width: "80%",
                  }}
                >
                  <Paper
                    style={{
                      backgroundImage: `url(${
                        msg.author ? msg.author.photoURL : ""
                      })`,
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

                      color: "white",
                      fontWeight: 600,
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: 12,
                        color: "white",
                        fontWeight: 600,
                      }}
                    >
                      {" "}
                      {msg.author.name}
                    </Typography>

                    {msg.content}
                  </Typography>
                  <Typography
                    style={{
                      marginLeft: 16,
                      marginTop: 2,
                      color: "grey",
                      fontSize: 10,
                    }}
                  >
                    {" "}
                    {"02/03/2021"}{" "}
                  </Typography>
                </Paper>
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
        <TextField
          InputProps={{ classes: { input: classes.input2 } }}
          variant="outlined"
          placeholder={`Message #${
            selectedChannel ? selectedChannel.name : ""
          }`}
          autoFocus
          onKeyPress={this.submitMessage}
          onChange={this.handleTyping}
          value={input}
          className={classes.input}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Chat);
