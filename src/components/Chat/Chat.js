import { Grid, Paper, TextField, Typography } from "@material-ui/core";
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
    usersTyping: {},
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
    db.collection("channels")
      .doc(channelId)
      .onSnapshot((snapshot) => {
        this.setState({ usersTyping: snapshot.data().usersTyping });
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
        content: [{ message: input, date: moment().format("lll") }],
        timestamp: firestore.FieldValue.serverTimestamp(),
        date: moment().format("lll"),
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
      const previousTime =
        lastMsg && lastMsg.content.length
          ? lastMsg.content[lastMsg.content.length - 1].date
          : null;

      const minutesPassedSincePrev = moment().diff(previousTime, "minutes");
      // generate new message if user has not sent a message in the last 20 minutes AND
      // if they are the previous author
      const addMessageToPrevious =
        minutesPassedSincePrev < 20 &&
        lastMsg &&
        lastMsg.author.uid === user.uid;

      if (addMessageToPrevious) {
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
              date: moment().format("lll"),
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

  isNewDay = (currentDate, previousDate) => {
    return !moment(currentDate).isSame(previousDate, "day");
  };

  getUserTypings = () => {
    const { usersTyping } = this.state;
    const { user } = this.props;
    let headline = "";
    const typers = Object.keys(usersTyping).reduce((acc, key) => {
      if (usersTyping[key].typing) acc = [...acc, usersTyping[key].name];
      return acc;
    }, []);
    if (typers.length > 2) headline = "Holy cow! Too many people to count!";
    else {
      const everyoneButMe = typers.filter((n) => n !== user.displayName);
      headline = everyoneButMe.length
        ? everyoneButMe.join(", ") + " are typing..."
        : "";
    }
    return (
      <span style={{ fontSize: 12, fontWeight: 600, marginLeft: 8 }}>
        {headline}
      </span>
    );
  };

  render() {
    const { messages, input } = this.state;
    const { classes, selectedChannel, user } = this.props;
    console.log(user.uid);
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
                        marginLeft: 22,

                        color: "white",
                        fontWeight: 600,
                      }}
                    >
                      <Typography
                        style={{
                          fontSize: 12,
                          color: "white",
                          fontWeight: 800,
                        }}
                      >
                        {" "}
                        {msg.author.name}
                        <span
                          style={{
                            fontSize: 10,

                            color: "grey",
                            fontWeight: 500,
                            marginLeft: 16,
                          }}
                        >
                          {msg.date}
                        </span>
                      </Typography>
                      <div style={{ marginTop: 4 }}>
                        {msg.content.map((content) => (
                          <div>
                            {" "}
                            {content.message} <br />
                          </div>
                        ))}
                      </div>
                    </Typography>
                  </Paper>
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
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Typography className={classes.userTypings}>
            {this.getUserTypings()}
          </Typography>
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
