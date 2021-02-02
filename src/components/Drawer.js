import { Drawer as MuiDrawer, makeStyles } from "@material-ui/core";

const Drawer = ({ width, variant }) => {

    const useStyles = makeStyles((theme) => ({
        drawerWrapper: {
            position: 'absolute',
            top: 64,
            width: width || '20%',
            height: `calc(100vh - 64px)`,
            backgroundColor: theme.palette[variant].light
        },
    }));

    const classes = useStyles();
    return (
        <MuiDrawer
            open
            PaperProps={{
                className: classes.drawerWrapper,
            }}
            anchor="left"
            variant="persistent"
        >
        </MuiDrawer>
    );
};

export default Drawer;