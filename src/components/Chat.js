import {
  Button,
  Input,
  Paper,
  TextField,
  Typography,
  Grid,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { withStyles } from "@material-ui/styles";
import React from "react";
import { connect } from "react-redux";
import db, { firestore } from "../firebase";

const styles = (theme) => ({
  "@global": {
    "*::-webkit-scrollbar-thumb": {
      display: "none",
    },
  },
});

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.messageRef = React.createRef();
  }
  state = {
    messages: [],
  };

  componentDidUpdate = (prevProps) => {
    const { selectedChannel } = this.props;
    if (prevProps.selectedChannel.id !== this.props.selectedChannel.id) {
      db.collection("channels")
        .doc(selectedChannel.id)
        .onSnapshot((doc) => {
          const { messages } = doc.data();
          console.log(messages);
          this.updateMessages(messages);
          this.messageRef.current.scrollIntoView({ behavior: 'smooth'})
        });
    }
  };

  updateMessages = (messages) => this.setState({ messages });

  addMessageToChannel = async () => {
    const { selectedChannel, user } = this.props;
    const content = prompt("What would you like to say?");
    const dbRef = db.collection("channels").doc(selectedChannel.id);
    const newMsg = {
      when: new Date(),
      content,
      author: { photoURL: user.photoURL },
    };
    dbRef.update({
      messages: firestore.FieldValue.arrayUnion(newMsg),
    });
  };

  render() {
    const { messages } = this.state;
    const { classes } = this.state;
    return (
      <div
        style={{
          position: "relative",
          top: 40,
          left: 372,
          width: "calc(100% - 384px)",
          height: "calc(100vh - 48px)",
        }}
      >
        <div
          style={{
            maxHeight: "calc(100vh - 160px)",
            padding: 12,
            overflow: "auto",
          }}
        >
          {messages && messages.length ? (
            messages.map((msg, i) => (
              <Paper
                ref={i === messages.length - 1 ? this.messageRef : null}
                style={{
                  minHeight: 40,
                  display: "flex",
                  margin: 12,
                  flexDirection: "row",
                  padding: 14,
                  backgroundColor: "#3b3b3b",
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
                    marginTop: 8,
                    color: "white",
                    fontWeight: 600,
                  }}
                >
                  {" "}
                  {msg.content}
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
                backgroundColor: "#3b3b3b",
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
        <Button
          onClick={this.addMessageToChannel}
          style={{
            position: "absolute",
            backgroundColor: "#595959",
            height: 48,
            right: 40,
            bottom: 80,
          }}
        >
          {" "}
          Add a message
        </Button>
        <Grid
          container
          spacing={2}
          style={{
            position: "absolute",
            backgroundColor: "#595959",
            height: 48,
            width: "100%",
            bottom: 12,
          }}
        >
          <Grid item md={11}>
            <TextField
              style={{
                position: "absolute",
                height: 48,
                width: "90%",
                bottom: -7,
              }}
            />
          </Grid>
          <Grid item alignItems="flex-end" md={1}>
            <button>
              <AddCircleIcon />
            </button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({});

const mapStateToProps = (state) => ({
  user: state.auth.user,
  selectedChannel: state.app.selectedChannel,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Chat));
