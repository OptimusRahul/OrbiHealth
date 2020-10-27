import React, { Component } from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import { Breadcrumbs, Link } from '@material-ui/core';

import Header from '../components/Header/Header';
import Drive from '../components/Drive/Drive';
import DriveContext from '../contexts/driveContext';
import Navigation from '../components/Navigation/Navigation';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridGap: theme.spacing(3),
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        whiteSpace: 'nowrap',
        marginBottom: theme.spacing(1),
    },
    divider: {
        margin: theme.spacing(2, 0),
    },
}));

class Dashboard extends Component {

    static contextType = DriveContext

    handleBreadCrumb = (id, index) => {
        this.context.popHistory(index)
        this.props.history.push(`/folder/${id}`);
    }

    renderBreadCrumbs = () => {
        return(
            <Breadcrumbs>
                {this.context.path.map(({ name, id }, index) => {
                    return (
                        <Link onClick={() => this.handleBreadCrumb(id, index)}>{name}</Link>
                    )
                })}
            </Breadcrumbs>
        );
    }

    render() {
         return (
            <>
                <div>
                    <Header />
                </div>
                <Grid container spacing={1} style={{marginTop: '10px'}}>
                    <Grid item xs={3}>
                        <Navigation />
                    </Grid>
                    <Grid item xs={9}>
                        <div>
                            {this.renderBreadCrumbs()}
                        </div>
                        <BrowserRouter>
                            <Switch>
                                <Route path="/folder/:id">
                                    <Drive />
                                </Route>
                            </Switch>
                        </BrowserRouter>
                    </Grid>
                </Grid>
            </>
        )
    }

}

export default withRouter(withStyles(useStyles)(Dashboard));