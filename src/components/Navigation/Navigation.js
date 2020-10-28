import React, { useContext, useState } from 'react';

import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Popover from '@material-ui/core/Popover';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { v4 as uuidv4 } from 'uuid';

import DriveContext from '../../contexts/driveContext';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        flexDirection: "column"
    },
    typography: {
        padding: theme.spacing(2),
    },
    button: {
        margin: theme.spacing(1),
        display: "flex",
        flexDirection: "column"
    },
}));

const Navigation = props => {

    const context = useContext(DriveContext)
    const { createFolder } = context;
    const classes = useStyles();
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [modal, setModal] = React.useState(false);
    const [text, setText] = useState('File');
    const [name, setName] = useState('');

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const handleOpen = (data) => {
        if(data === 1) {
            setText('File')
        } else  {
            setText('Folder')
        }
        setModal(true);
    };
    
    const handleModalClose = () => {
        setModal(false);
    };

    const onChangeHandler = val => {
        setName(val);
    }

    const addDocument = () => {
        const id = window.location.pathname.replace('/folder/', '');
        if(name !== null && name !== undefined && name !== '') {
            createFolder({
                id: uuidv4(),
                name,
                type: text.toLowerCase()
            }, id)
            handleModalClose()
        } else {
            window.alert("Please enter file/folder name");
        }
        setName('');
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return(
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<AddIcon />} 
                onClick={handleClick}
                style={{ display: 'flex', justifyContent: 'center' }}>
            New
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }} >
                <Button className={classes.button} onClick={() => handleOpen(1)}>Add File</Button>
                <Button className={classes.button} onClick={() => handleOpen(2)}>Add Folder</Button>
                <Modal
                    required
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={modal}
                    onClose={handleModalClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }} >
                    <Fade in={modal}>
                        <div className={classes.paper}>
                            <h2 id="transition-modal-title">{text}</h2>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Required"
                                    variant="outlined" 
                                    onChange={e => onChangeHandler(e.target.value)}/>
                                <br />
                                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                                    <Button variant="contained" color="primary" onClick={addDocument}>
                                        Add
                                    </Button>
                                    <Button variant="contained" color="secondary" onClick={handleModalClose}>
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Fade>
                </Modal>
            </Popover>
    </div>
    )
}

export default withRouter(Navigation);