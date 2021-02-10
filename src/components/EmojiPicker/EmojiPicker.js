import React, { Component, useState } from "react";
import { Dialog, Paper, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import emojione from "emojione";
import { peopleEmojis } from "./emojis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import Backdrop from '@material-ui/core/Backdrop';

const useStyles = makeStyles((theme) => ({
  paper: {
    height: 400,
    width: 400,
    position: "fixed",
    right: 420,
    bottom: 29,
    zIndex: 1600,
    backgroundColor: "#2f3136",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    overflow: "auto",
  },
  header: {
    position: "sticky",
    backgroundColor: "#2f3136",
    top: 0,
    padding: 10,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    width: "100%",
  },
  dialog: {
    position: "absolute",
    right: 20,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'transparent',
  },
  emoji: {
    fontSize: 30,
    cursor: "pointer",
  },
  input: {
    backgroundColor: theme.palette.primary.dark,
    height: 34,
    color: "white",
  },
}));
const EmojiPicker = ({ open, toggleEmojiPicker }) => {
  const classes = useStyles();

  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [searchText, setSearchText] = useState("");

  const onEmojiClick = (e, emojiObject) => {
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };
  return open ? (
    <Backdrop className={classes.backdrop} open={open} onClick={toggleEmojiPicker}>
    <Paper className={classes.paper}>
      <Paper className={classes.header}>
        <TextField
          autoFocus={true}
          onChange={handleSearch}
          value={searchText}
          style={{ width: "85%" }}
          InputProps={{
            endAdornment: (
              <FontAwesomeIcon
                style={{ cursor: "pointer" }}
                onClick={() => setSearchText("")}
                icon={searchText.length ? faTimes : faSearch}
              />
            ),
            className: classes.input,
          }}
          variant="outlined"
        ></TextField>
        <Typography className={classes.emoji}>👏</Typography>
      </Paper>
      {peopleEmojis.map((emoji, index) => (
        <div
          id={index}
          className={classes.emoji}
          key={index}
          role="presentation"
          onClick={onEmojiClick}
          dangerouslySetInnerHTML={{ __html: emojione.unicodeToImage(emoji) }}
        />
      ))}
    </Paper>
    </Backdrop>
  ) : (
    ""
  );
};

export default EmojiPicker;
