import { Dialog, makeStyles, Paper, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useState } from "react";
import { truncateString } from "../../utilities";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "relative",
    textAlign: "center",
    width: 400,
    height: 200,
    backgroundColor: theme.palette.primary.main,
  },
footerButton: {
  color: "#fff",
  backgroundColor: theme.palette.secondary.main,
  "&:hover": {
    backgroundColor: "#4f4f4f",
  },
},
  link: {
    padding: 12,
    textDecoration: "none",
    flexWrap: "nowrap",
    width: 400,
    color: "white",
    backgroundColor: "#2f3136",
    cursor: "pointer",
  },
  linkBody: {
    display: "flex",
    height: 40,
    width: "100%",
    flexWrap: "nowrap",
  },
  linkBody2: {},
}));
const ChatItemLink = ({ content }) => {
  const classes = useStyles();
  const [showNavDialog, setNavDialog] = useState(false);
  const toggleDialog = () => {
    setNavDialog(!showNavDialog);
  };

  const displayContent = (key) => {
    return content[key] && content[key] !== "Unknown"
      ? truncateString(content[key], 100)
      : "";
  };
  const navigateToNewPage = () => {
    const newWindow = window.open(content.message, '_blank');
    newWindow.focus();
  }

  const LinkDialog = () => {
    return (
      <Dialog
        PaperProps={{
          className: classes.paper,
        }}
        open={showNavDialog}
        onClose={toggleDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style={{ color: 'white'}} id="alert-dialog-title">
          Do you trust this link?
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{ color: 'white'}} id="alert-dialog-description">
            Clicking this link will navigate you to a new tab.
          </DialogContentText>
        </DialogContent>

        <DialogActions>

        <Button
          onClick={navigateToNewPage}
          className={classes.footerButton}
        >
          Proceed
        </Button>
        </DialogActions>
      </Dialog>
    );
  };
  return (
    <Paper elevation={2} onClick={toggleDialog} className={classes.link}>
      <div className={classes.linkBody}>
        {content.icon && (
          <img
            src={content.icon}
            style={{ height: 40, marginRight: 8, width: 40 }}
          />
        )}
        <Typography style={{ width: "100%", marginTop: 8, fontWeight: 600 }}>
          {" "}
          {displayContent("site")}
        </Typography>
      </div>
      <div className={classes.linkBody2}>
        {content.img && (
          <img
            src={content.img}
            style={{ height: "300px", width: "100%", marginTop: 8 }}
          />
        )}
        <Typography style={{ width: "100%", marginTop: 8, fontWeight: 600 }}>
          {" "}
          {displayContent("title1")}
        </Typography>

        {/* <Typography style={{ width: "100%", marginTop: 8, fontWeight: 600 }}> {displayContent("description")}</Typography> */}
      </div>
      <LinkDialog />
    </Paper>
  );
};

export default ChatItemLink;
