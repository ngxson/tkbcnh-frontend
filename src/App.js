import React from 'react';
import Theme from './Theme';
import AdminLayout from './layouts/Admin';
import HomeLayout from './layouts/Home';
import './App.css';
import Header from './components/Header';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

function App() {
  return (
    <Router>
      <MuiThemeProvider theme={Theme}>
        <React.Fragment>
          <CssBaseline />
          <Header />
          <div className="mainView">
            <Route exact path="/" component={Home} />
            <Route path="/admin" component={Admin} />
          </div>
        </React.Fragment>
      </MuiThemeProvider>
    </Router>
  );
}

function Home() {
  return <HomeLayout />
}

function Admin() {
  return <AdminLayout />
}

export default App;
