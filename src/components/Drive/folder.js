import React, { useContext, useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import DriveContext from '../../contexts/driveContext';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import EmptyIcon from '../../assets/download.png'
import folderImg from '../../utils/images/folder.svg'
import fileImg from '../../utils/images/document.svg'

import './folder.scss'

const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
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
    }
}));

const Folder = (props) => {

    const classes = useStyles();

    const [name, setName] = useState();
    const [modal, setModal] = React.useState(false);
    const { folders, deleteFolder,  renameFolder, pathHistory } = useContext(DriveContext);

    const currentLocation = window.location.pathname;

    const onClickHandler = ({ id, name }) => {
      pathHistory({ id , name });
      props.history.push(`/folder/${id}`)
    }

    useEffect(() => {
      let id = currentLocation.replace('/folder/', '');
      props.history.push(`/folder/${id}`)
    }, [props.history, currentLocation])

    const deleteDocumentHandler = ({id}) => {
      deleteFolder(props.match.params.id, id);
    }

    const onChangeHandler = val => {
      setName(val);
    }

    const renderModals = () => {
      setModal(true);
    }

    const handleModalClose = () => {
      setModal(false);
    };
    
    const renameFolderHandler = ({ id }) => {
      renameFolder(props.match.params.id, id, name);
      handleModalClose();
    };

    const renderFiles = () => {
      const {id} = props
      const documents = folders[id]
      
      if(documents.length < 1)  {
        return (
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center' }}>
                <img src={EmptyIcon} alt="empty-icon" width="100px" height="100px"/>
                <p>No Files or Folder. Please create a new file or folder</p>
            </div>
        )
      }

      return documents.map(document => {
        if(document.type === "folder") {
          return (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div className="folder_main" onClick={() => onClickHandler(document)} style={{
                cursor: "pointer",
                color: "red",
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'}} > 
                  <img className="file_icon" src={folderImg} alt="folder" width='100px' height="100px" />
                  <p className="file_text" style={{marginLeft: '10px'}}>{document.name} </p>
                  <div onClick={() => renderModals()} style={{ color: 'black', marginLeft: '10px' }}>{' '} <EditIcon /> {' '}</div>
                  <div onClick={() => deleteDocumentHandler(document)} style={{ color: 'black', marginLeft: '10px' }}>{' '} <DeleteIcon />  {' '}</div>
              </div>
              <Modal
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
                        <h2 id="transition-modal-title">Change Name</h2>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <TextField
                                value={name}
                                required
                                id="outlined-required"
                                label="Required"
                                variant="outlined" 
                                onChange={e => onChangeHandler(e.target.value)}/>
                            <br />
                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                                <Button variant="contained" color="primary" onClick={() => {renameFolderHandler(document)}}>
                                    Rename
                                </Button>
                                <Button variant="contained" color="secondary" onClick={handleModalClose}>
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
            </div>
          );
        } else {
          return (
            <div className="file_main" style={{ 
              display: 'flex', 
              flexDirection: 'row',
              alignItems: 'center', }}> 
              <img className="file_icon" src={fileImg} alt="file" width='100px' height="100px"/>
              <p className="file_text"> {document.name} </p>
            </div>
          );
        }
      })
    }
    
    return (

        <Card className={classes.root} style={{ margin: "10px", justifyContent: 'center' }}>
            <CardContent style={{ 
              display: 'flex', 
              flexDirection: 'row', 
              justifyContent: 'baseline', 
              alignItems: 'center',
              margin: "10px" }}>
                <Typography variant="h5" component="h2">
                  {renderFiles()}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default withRouter(Folder);