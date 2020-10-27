import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './container/Dashboard';

import { DriveProvider } from './contexts/driveContext';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
          <DriveProvider>
            <BrowserRouter>
              <Dashboard />
            </BrowserRouter>
          </DriveProvider>
      </div>
    );
  }
}

export default App;
