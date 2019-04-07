import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import LawyerHome from './pages/LawyerHome'
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path = "/LawyerHome" component={LawyerHome} />
      </Router>
    );
  }
}

export default App;
