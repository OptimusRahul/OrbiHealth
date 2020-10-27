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
        
        return (
            <>
                { this.context.folders[id] ? <Folder id={id}/> : null }
            </>
        );
    }
}

export default withRouter(Drive);