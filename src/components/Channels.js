import {
  Typography,
  Grid,
  Divider,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from "@material-ui/core";
import { ArrowDropDown, ExpandMore, ViewHeadline } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import db from "../firebase";
import Drawer from "./Drawer";

const Channels = ({ selectedServer }) => {
  const getChannels = async () => {
    const snapshot = await db
      .collection("channels")
      .where("serverId", "==", selectedServer.id)
      .get();
    console.log(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  };

  const [channels, setChannels] = useState([]);

  useEffect(async () => {
    if (selectedServer.id) {
        console.log('yooooooooo')
      const channels = await getChannels();
      setChannels(channels);
    }
  }, [selectedServer.id]);

  const addChannel = async () => {
    const name = prompt("What do you want you your channel to be named?");
    await db.collection("channels").add({
      serverId: selectedServer.id,
      name: name,
      timestamp: new Date(),
    });
    const channels = await getChannels();
    setChannels(channels);
  };
  return (
    <Drawer width="360px">
      <div style={{ padding: "12px 12px 12px 97px" }}>
        <Grid container>
          <Grid item xs={8}>
            <Typography
              style={{ color: "white", fontWeight: 600 }}
              variant="h6"
            >
              {selectedServer.name}
            </Typography>
          </Grid>

          <Grid item xs={3}>
            <ExpandMore
              style={{
                float: "right",
                cursor: "pointer",
                fontSize: 32,
                color: "white",
              }}
            ></ExpandMore>
          </Grid>
          <Divider
            style={{ width: "100%", height: 1, backgroundColor: "#eee" }}
          />
        </Grid>

        <Grid container>
          <List style={{ width: "100%" }}>
            {channels.map((chl) => (
              <>
                <ListItem
                  style={{ backgroundColor: "slategrey", width: "100%" }}
                  button
                  style={{ color: "white" }}
                >
                  <ListItemAvatar>
                    <ViewHeadline />
                  </ListItemAvatar>
                  <ListItemText
                    primary={chl.name}
                    // secondary={"idk"}
                  />
                </ListItem>
              </>
            ))}
          </List>
        </Grid>
        <Button
          onClick={addChannel}
          style={{ position: "absolute", bottom: 10, backgroundColor: "#eee" }}
        >
          {" "}
          ADD ONE{" "}
        </Button>
      </div>
    </Drawer>
  );
};

const mapStateToProps = (state) => ({
  selectedServer: state.app.selectedServer,
});

export default connect(mapStateToProps, null)(Channels);
