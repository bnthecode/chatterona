import { Drawer as MuiDrawer, makeStyles } from "@material-ui/core";

const Drawer = ({ width, variant, anchor, children, ...rest }) => {

    const useStyles = makeStyles((theme) => ({
        drawerWrapper: {
            position: 'absolute',
            width: width,
            height: '100vh',
        },
    }));

    const classes = useStyles();
    return (
        <MuiDrawer
            open
            PaperProps={{
                className: classes.drawerWrapper,
                ...rest,
            }}
            anchor={anchor}
            variant="persistent"
        >
            {children}

        </MuiDrawer>
    );
};

export default Drawer;