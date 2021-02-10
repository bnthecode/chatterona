import { Component } from "react";
import { connect } from "react-redux";
import Channels from "../components/Channels/Channels";
import Chat from "../components/Chat/Chat";
import Header from "../components/Header";
import Servers from "../components/Servers/Servers";
import ServerUsers from "../components/Servers/ServerUsers";
import { setChannelRedux, setServerRedux } from "../redux/actions/appActions";

class Main extends Component {
  componentDidMount = () => {
 
  };

  renderPane = (type) => {
    const { selectedServer, selectedChannel, user } = this.props;
    switch(type) {
      case 'text': return <Chat user={user} selectedServer={selectedServer} selectedChannel={selectedChannel} />

      default: return <div/>
    }
  }

  determineCenterPane = (channel) => {
    return channel.id ? this.renderPane(channel.type) : <div/>
  }
  render() {
    const {
      setServer,
      setChannel,
      selectedServer,
      selectedChannel,
      user,
      mobileView,
    } = this.props;
    const { id } = selectedServer;

    return (
      <>
        <Header mobileView={mobileView} />
        <Channels
          selectedServer={selectedServer}
          setChannel={setChannel}
          selectedChannel={selectedChannel}
          user={user}
        />
        <Servers
          selectedServer={selectedServer}
          setChannel={setChannel}
          setServer={setServer}
          user={user}
        />
        { this.determineCenterPane(selectedChannel) }
        {id ? <ServerUsers selectedServer={selectedServer} /> : ""}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  selectedServer: state.app.selectedServer,
  selectedChannel: state.app.selectedChannel,
  mobileView: state.app.mobileView,
});

const mapDispatchToProps = (dispatch) => ({
  setServer: dispatch(setServerRedux),
  setChannel: dispatch(setChannelRedux),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
