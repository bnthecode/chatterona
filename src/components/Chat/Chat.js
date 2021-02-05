import { Paper, TextField, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import moment from "moment";
import React from "react";
import db, { firestore } from "../../firebase";
import channelService from "../../services/channel-service";

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
  userTypings: {
    width: 400,
    position: "absolute",
    bottom: 60,
    borderRadius: 8,
    color: "white",
  },
});

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.messageRef = React.createRef();
  }
  state = {
    messages: [],
    usersTyping: [],
    input: "",
  };

  componentDidMount = () => {
    const { selectedChannel } = this.props;
    this.registerChannelListener(selectedChannel.id);
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { selectedChannel } = this.props;
    if (prevProps.selectedChannel.id !== selectedChannel.id) {
      this.registerChannelListener(selectedChannel.id);
    }
  };

  registerChannelListener = (channelId) => {
    db.collection("channels")
      .doc(channelId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        this.setState({
          messages: snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
        });
        if (this.messageRef && this.messageRef.current) {
          this.messageRef.current.scrollIntoView({ behavior: "smooth" });
        }
      });
  };

  updateMessages = (messages) => this.setState({ messages });

  addMessageToChannel = async () => {
    this.setState({ userTyping: false });
    const { input } = this.state;
    const { selectedChannel, user } = this.props;

    await db
      .collection("channels")
      .doc(selectedChannel.id)
      .collection("messages")
      .add({
        content: [{message: input, date: moment().format("lll") }],
        timestamp: firestore.FieldValue.serverTimestamp(),
        author: {
          photoURL: user.photoURL,
          name: user.displayName,
          uid: user.uid,
        },
      });
  };

  handleTyping = (e) => {
    this.setState({ userTyping: true });
    const { selectedChannel, user } = this.props;
    channelService.addUserTyping(selectedChannel.id, user, true);
    let input = e.target.value;
    this.setState({ input: input });
  };

  submitMessage = (e) => {
    const { selectedChannel, user } = this.props;
    const { messages } = this.state;
    if (e.key === "Enter") {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg && lastMsg.author.uid === user.uid) {
        console.log(lastMsg.id);
        console.log("you sent the last one");
        db.collection("channels")
          .doc(selectedChannel.id)
          .collection("messages")
          .doc(lastMsg.id)
          .update(
            {
              content: firestore.FieldValue.arrayUnion({
                message: this.state.input,
                date: moment().format("lll"),
              }),
              timestamp: firestore.FieldValue.serverTimestamp(),

              author: {
                photoURL: user.photoURL,
                name: user.displayName,
                uid: user.uid,
              },
            },
            { merge: true }
          );
        this.setState({ input: "" });
        channelService.addUserTyping(selectedChannel.id, user, false);
        return;
      }
      this.setState({ input: "" });
      channelService.addUserTyping(selectedChannel.id, user, false);
      return this.addMessageToChannel();
    }
  };

  render() {
    const { messages, input, usersTyping } = this.state;
    const { classes, selectedChannel, user } = this.props;
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

                    {msg.content.map((content) => (
                      <div>
                        {" "}
                        {content.message} <br />
                      </div>
                    ))}
                  </Typography>
                  <Typography
                    style={{
                      marginLeft: 16,
                      marginTop: 2,
                      color: "grey",
                      fontSize: 10,
                    }}
                  >
                    {msg.content[0].date}
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

        {Object.keys(usersTyping).map((key) =>
          key !== user.uid ? (
            <Typography className={classes.userTypings}>
              <span>{`${usersTyping[key]} is typing...`}</span>
            </Typography>
          ) : (
            ""
          )
        )}

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
