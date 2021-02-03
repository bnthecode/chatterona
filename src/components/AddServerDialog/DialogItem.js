import {
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  dialogItem: {
    textTransform: "none",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 60,
    padding: '0 16px 0 16px',
    margin: 4,
    borderRadius: 8
  },
  dialogItemIcon: {
    color: theme.palette.secondary.dark,
    fontSize: 24,
  },
  flexItemRight: {
    marginRight: "auto",
  },
  flexItemLeft: {
    marginLeft: "auto",
    fontSize: 20,
  },
  dialogItemText: {
    fontSize: 14,
    fontWeight: 600,
  },
}));

const DialogItem = ({ clickHandler, title, iconLeft, iconRight }) => {
  const classes = useStyles();
  return (
    <Button
      onClick={clickHandler}
      className={classes.dialogItem}
      variant="outlined"
    >
      <FontAwesomeIcon
        className={clsx([classes.dialogItemIcon, classes.flexItemRight])}
        icon={iconLeft}
      ></FontAwesomeIcon>
      <Typography className={classes.dialogItemText}>{title}</Typography>
      <FontAwesomeIcon
        className={clsx([classes.dialogItemIcon, classes.flexItemLeft])}
        icon={iconRight}
      ></FontAwesomeIcon>
    </Button>
  );
};

export default DialogItem;
