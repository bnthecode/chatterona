import { Drawer as MuiDrawer, makeStyles } from "@material-ui/core";

const Drawer = ({ width, variant, children, ...rest }) => {

    const useStyles = makeStyles((theme) => ({
        drawerWrapper: {

            position: 'absolute',
            width: width || '20%',
            height: '100vh',

            backgroundColor: theme.palette.secondary.light,
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
            anchor="left"
            variant="persistent"
        >
            {children}

        </MuiDrawer>
    );
};

export default Drawer;