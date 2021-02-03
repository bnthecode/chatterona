import {
  DialogTitle,
  Typography,
  makeStyles,
  Paper,
} from "@material-ui/core";
import {
  faUserFriends,
  faUsers,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import DialogItem from "../DialogItem";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 20,
    fontWeight: 700,
  },
  subtitle: {
    marginTop: 8,
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
    backgroundColor: "lightgrey",
    width: "100%",
  },


  footerText: {
    fontWeight: 600,
    cursor: "pointer",
    margin: 20,
  },
}));
const PageTwo = ({ setStep, step }) => {
  const classes = useStyles();
  return (
    <>
      <DialogTitle>
        <Typography className={classes.title}>
          Tell us more about your server
        </Typography>
        <Typography variant="body2" className={classes.subtitle}>
          In order to help you with your setup, is your new server for just a
          few friends or a larger community?
        </Typography>
      </DialogTitle>
      <DialogItem
        title="For a club or community"
        clickHandler={() => setStep(step + 1)}
        iconLeft={faUserFriends}
        iconRight={faChevronRight}
      />
      <DialogItem
        title="For me and my friends"
        clickHandler={() => setStep(step + 1)}
        iconLeft={faUsers}
        iconRight={faChevronRight}
      />
      <Paper className={classes.footer}>
        <Typography
          onClick={() => setStep(step - 1)}
          className={classes.footerText}
          variant="body2"
        >
          Back
        </Typography>
      </Paper>
    </>
  );
};

export default PageTwo;
