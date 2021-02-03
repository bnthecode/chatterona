import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Dialog } from "@material-ui/core";

import PageOne from "./pages/PageOne";
import PageTwo from "./pages/PageTwo";
import PageThree from "./pages/PageThree";
import Stepper from "../Stepper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "relative",
    textAlign: "center",
    width: 400,
    height: 500,
    backgroundColor: "#eee",
    padding: 18,
  },
  closeBtn: {
    position: "absolute",
    top: 8,
    right: 12,
    fontSize: 24,
    cursor: "pointer",
  },
}));

const AddServerDialog = ({
  showAddServerDialog,
  handleAddServer,
  setAddServerDialogOpen,
}) => {
  const classes = useStyles();
  const componentList = [PageOne, PageTwo, PageThree];
  return (
    <Dialog
      PaperProps={{
        className: classes.paper,
      }}
      open={showAddServerDialog}
    >
      <FontAwesomeIcon
        onClick={() => setAddServerDialogOpen(false)}
        className={classes.closeBtn}
        icon={faTimes}
      ></FontAwesomeIcon>
      <Stepper onComplete={handleAddServer} componentList={componentList} />
    </Dialog>
  );
};

export default AddServerDialog;
