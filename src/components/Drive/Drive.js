import React, { Component } from 'react';
import Folder from './folder';
import { withRouter } from 'react-router-dom';

import DriveContext from '../../contexts/driveContext';

import EmptyIcon from '../../assets/download.png'

class Drive extends Component {

    static contextType = DriveContext;

    componentDidMount() {
        const { match } = this.props;
        const { id } = match.params;
        const folder = this.context.folders[id];
        if(!folder) {
            this.props.history.push(`/folder/${Object.keys(this.context.folders)[0]}`);
        }
    }

    renderEmpty = () => {
        return (
            <div>
                <img src={EmptyIcon} alt="empty-icon" />
            </div>
        );
    }

    render() {
        const { match } = this.props;
        const { id } = match.params;
        // const id = window.location.pathname.replace('/folder/', '')
        
        return (
                    <>
                        { this.context.folders[id] ? <Folder id={id}/> : null }
                    </>
                );
        
        // console.log(this.props.match);
        // let id;
        
        // if(this.props.match) id = this.props.match.params.id;
        // else id = '';
        // //const id = window.location.pathname.replace('/folder/', '')
        // console.log(this.context.path.id, this.context.folders, id);
        // console.log(this.context.folders[id], this.props);
        // if(id) {
        //     return (
        //         <>
        //             { this.context.folders[id] ? <Folder id={id}/> : null }
        //         </>
        //     );
        // } else {
        //     return null;
        // }
    }
}

export default withRouter(Drive);