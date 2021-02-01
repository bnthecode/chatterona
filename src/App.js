import { connect } from "react-redux";
import Channels from "./components/Channels";
import Header from "./components/Header";

function App({ ui }) {

  console.log(ui)
  return (
    <div style={{backgroundColor: '#212121', height: '100vh', width: '100%'}}> 
    <Header/>
    <Channels />
    </div>
  );
}

const mapStateToProps = (state) => ({
  ui: state.ui
})


export default connect(mapStateToProps, null)(App);
