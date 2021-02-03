import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {

  Dialog,

} from "@material-ui/core";

import PageOne from "./pages/PageOne";
import PageTwo from "./pages/PageTwo";
import PageThree from "./pages/PageThree";
import Stepper from "../Stepper";
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    textAlign: "center",
    width: 400,
    height: 500,
    backgroundColor: "#eee",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 4, 3),
    top: "calc(50% - 280px)",
    left: "calc(50% - 200px)",
  },
  title: {
    fontSize: 20,
    fontWeight: 800,
  },
  subtitle: {
    marginTop: 8,
    color: "grey",
  },
  dialogItem: {
    textTransform: "none",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 16,
  },
  dialogItemIcon: {
    color: theme.palette.secondary.dark,
    fontSize: 24,
  },
  flexItemRight: {
    marginRight: 'auto'
  },
  flexItemLeft: {
    marginLeft: 'auto'
  },
  dialogItemText: {
    fontSize: 18,
    fontWeight: 600,
    
  },
}));



const AddServerDialog = ({ open, handleAddServer }) => {
  const classes = useStyles();
  const [serverName, setServerName] = React.useState("");
  const componentList = [PageOne, PageTwo, PageThree];
  return (
    <Dialog
      PaperProps={{
        className: classes.paper,
      }}
      open={open}
    >
     <Stepper onComplete={handleAddServer} componentList={componentList} />

      {/* <FormControl>
        <InputLabel style={{ color: "white" }} htmlFor="my-input">
          Enter Server Name:
        </InputLabel>
        <Input
          onChange={({
            e: {
              target: { value },
            },
          }) => setServerName(value)}
          id="my-input"
        />
      </FormControl> */}

      {/* <Button
              onClick={() => handleAddServer(serverName)}
              className={classes.btn}
            >
              Add Server
            </Button> */}
    </Dialog>
  );
};

export default AddServerDialog;
