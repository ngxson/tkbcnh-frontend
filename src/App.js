import React from 'react';
import AdminLayout from './layouts/Admin';
import './App.css';
import Header from './components/Header';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <React.Fragment>
        <CssBaseline />
        <Header />
        <div className="mainView">
          <Route exact path="/" component={Home} />
          <Route path="/admin" component={Admin} />
        </div>
      </React.Fragment>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>
}

function Admin() {
  return <AdminLayout />
}

export default App;
