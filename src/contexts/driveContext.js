import React, {Component} from 'react'
import { v4 as uuidv4 } from 'uuid';

const DriveContext = React.createContext(null)
const myDrive = uuidv4();

export class DriveProvider extends Component {
  // Context state
  constructor(props) {
    super(props);
    this.state = {
      path: [{ id: "root", name: 'MyDrive' }],
      folders: {
        ['root']: []
      }
    }
  }

  pathHistory = (folder) => {
    this.setState( { path: [...this.state.path, folder] })
  }

  popHistory = (index) => {
    const a = this.state.path;
    if(index+1 !== this.state?.path?.length) {
      let path = this.state.path.splice(0, index + 1);
      this.setState({ path })
    }
  }

  // Method to update state
  createFolder = (folder, parentId) => {
    const {folders} = this.state;
    
    folders[parentId] = [
      ...folders[parentId],
      folder
    ]

    if(folder.type === 'folder') {
      folders[folder.id] = []
    }

    this.setState({
      folders: {...folders}
    })
  }

  deleteFolder = (parentFolderID, folderId) => {
    let {folders} = this.state;
    let folder = folders[parentFolderID];
    let index = folder.findIndex(item => item.id === folderId);
    folder.splice(index, 1);
    this.setState({folders})
  }

	renameFolder = (parentFolderID, folderId, newName) => {
    let {folders} = this.state;
    let folder = folders[parentFolderID];
    let index = folder.findIndex(item => item.id === folderId);
    folder[index].name = newName;
    this.setState({folders})
  }

  get folders(){
    return this.state.folders
  }

  get path(){
   return this.state.path
  }

  render() {
    const { children } = this.props;
    const { createFolder, folders, path, renameFolder, deleteFolder, pathHistory, popHistory } = this

    return (
      <DriveContext.Provider
        value={{
          createFolder,
          deleteFolder,
          renameFolder,
          folders,
          path,
          pathHistory,
          popHistory
        }}
      >
        {children}
      </DriveContext.Provider>
    )
  }
}

export default DriveContext;