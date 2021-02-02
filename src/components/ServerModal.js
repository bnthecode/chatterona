import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import AddIcon from '@material-ui/icons/Add';
import { FormControl, InputLabel, Input } from '@material-ui/core';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.secondary.dark,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    btn: {
        height: 40,
        width: 40,
        minHeight: 40,
        color: "#20b673",
        borderRadius: 20,
        backgroundSize: 'contain',
        backgroundColor: theme.palette.secondary.dark,
        margin: 6,
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        "&:hover": {
            transition: "all .25s",
            color: 'white',
            borderRadius: "40%",
        },
    },
}));

export default function ServerModal() {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <button type="button" className={classes.btn} onClick={handleOpen}>
                <AddIcon />
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={modalStyle} className={classes.paper}>
                    <FormControl>
                        <InputLabel htmlFor="my-input" style={{ color: "white" }}>Enter Server Name:</InputLabel>
                        <Input id="my-input" aria-describedby="my-helper-text" />
                    </FormControl>
                </div>
            </Modal>
        </div>
    );
}