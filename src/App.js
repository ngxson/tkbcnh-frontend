import React from 'react';
import Admin from './layouts/Admin';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Admin
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="mainView">
        <Admin />
      </div>
    </React.Fragment>
  );
}

export default App;
