import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Dialog, DialogTitle, InputLabel, Paper, TextField, Typography } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "relative",
    textAlign: "center",
    width: 400,
    height: 500,
    backgroundColor: theme.palette.primary.main,
    padding: 18,
  },
  closeBtn: {
    position: "absolute",
    top: 8,
    right: 12,
    fontSize: 24,
    color: theme.palette.primary.light,
    cursor: "pointer",
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    color: '#fff'
  },
  subtitle: {
    color: "grey",
  },
  footer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    height: 80,
    backgroundColor: theme.palette.primary.dark,
    width: "100%",
  },


  footerText: {
    fontWeight: 600,
    color: '#fff',
    cursor: "pointer",
    margin: 20,
  },
  footerButton: {
    marginLeft: "auto",
    height: 40,
    width: 140,
    marginRight: 20,
    fontWeight: 700,
    textTransform: "none",
    color: "#fff",
    backgroundColor: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: "#4f4f4f",
    },
  },
  label: {
      color: 'grey',
    fontSize: 12,
    fontWeight: 800,
    alignSelf: "flex-start",
    marginBottom: 4,
  },
  input: {
    '&::placeholder': {
        color: 'white',
      },
      '&:focused': {
        borderColor: 'orange'
     },
      backgroundColor: theme.palette.primary.dark,
      color: 'white',
    fontWeight: 600,
    height: 36,
    fontSize: 12,
    padding: 2,
  },
  focused: {},

}));

const CreateChannelDialog = ({
  showChannelDialog,
  handleAddChannel,
  setChannelDialogOpen,
}) => {
    const classes = useStyles();
  const { open , type } = showChannelDialog;
  const [channelName, setChannelName ] = useState('');
  return (
    <Dialog
      PaperProps={{
        className: classes.paper,
      }}
      open={open}
    >
      <FontAwesomeIcon
        onClick={() => setChannelDialogOpen({...showChannelDialog, open: false })}
        className={classes.closeBtn}
        icon={faTimes}
      ></FontAwesomeIcon>
         <DialogTitle>
        <Typography className={classes.title}>Create {type} channel</Typography>
        <Typography variant="body2"  className={classes.subtitle}>
            in {type} channels
        </Typography>
      </DialogTitle>
      <InputLabel className={classes.label} htmlFor="server-name">
        CHANNEL NAME
      </InputLabel>
      <TextField
        autoFocus
        placeholder="new-channel"
        color="secondary"
        onChange={({target : { value }}) => setChannelName(value)}
        InputProps={{
          className: classes.input,
          focused: classes.focused,
          notchedOutline: classes.notchedOutline
        }}
        className={classes.muiInput}
        id="server-name"
        variant="outlined"
        margin="dense"
      ></TextField>
      <Paper className={classes.footer}>
        <Typography
          className={classes.footerText}
          variant="body2"
        >
          Cancel
        </Typography>
        <Button
          onClick={() => handleAddChannel({ name: channelName, type})}
          className={classes.footerButton}
        >
          Create Channel
        </Button>
      </Paper>
    </Dialog>
  );
};

export default CreateChannelDialog;
