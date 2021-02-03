import { Paper, Tooltip, makeStyles } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  serverListItem: {
    height: 44,
    width: 44,
    minHeight: 40,
    color: "#20b673",
    borderRadius: 22,
    backgroundSize: "contain",
    backgroundColor: theme.palette.secondary.dark,
    margin: 6,
    display: "grid",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    "&:hover": {
      transition: "all .5s",
      color: "white",
      borderRadius: "40%",
    },
  },
  selectedItem: {
    border: "1px solid white",
  },
}));

const ServerListItem = ({
  listItemProps,
  id,
  title,
  selected,
  setSelected,
  children,
}) => {
  const classes = useStyles();
  return (
    <div onClick={() => setSelected(id)}>
      <Tooltip placement="right" title={title}>
        <Paper
        onClick={() => setSelected(id)}
          className={clsx([
            selected ? classes.selectedItem : null,
            classes.serverListItem,
          ])}
          {...listItemProps}
        >
          {children}
        </Paper>
      </Tooltip>
    </div>
  );
};

export default ServerListItem;
