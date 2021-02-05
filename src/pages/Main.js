import { Component } from "react";
import { connect } from "react-redux";
import Channels from "../components/Channels/Channels";
import ChannelUsers from "../components/Chat/ChannelUsers";
import Chat from "../components/Chat/Chat";
import Header from "../components/Header";
import Servers from "../components/Servers/Servers";
import { setChannelRedux, setServerRedux } from "../redux/actions/appActions";
class Main extends Component {
  render() {
    const {
      setServer,
      setChannel,
      selectedServer,
      selectedChannel,
      user,
      mobileView,
    } = this.props;
    const { id } = selectedChannel;
    
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
        {id ? <Chat selectedChannel={selectedChannel} user={user} /> : ""}
        {id ? <ChannelUsers /> : ""}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  selectedServer: state.app.selectedServer,
  selectedChannel: state.app.selectedChannel,
  mobileView: state.app.mobileView
});

const mapDispatchToProps = (dispatch) => ({
  setServer: dispatch(setServerRedux),
  setChannel: dispatch(setChannelRedux),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
