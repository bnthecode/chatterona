import { Drawer, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    drawerWrapper: {
        position: 'absolute',
        top: 64,
        width: '20%',
        height: 'calc(100vh - 64px)',
        backgroundColor: theme.palette.primary.light
    },
}));

const Channels = () => {
    const classes = useStyles();
  return (
    <Drawer
    open
      PaperProps={{
        className: classes.drawerWrapper,
      }}
      anchor="left"
      variant="persistent"
    >
    </Drawer>
  );
};

export default Channels;
