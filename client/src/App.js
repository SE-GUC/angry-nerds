import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
 import AddLawyer from './components/AddLawyer';
 import AddReviewer from './components/AddReviewer';
 import testing from './components/testing';




class App extends Component {
  render() {
    return (
      <Router>
        <div>
          {/* <Route exact path = "/" component={AddLawyer}/> */}
          <Route path="/lawyer" component={AddLawyer} />
          <Route path="/reviewer" component={AddReviewer} /> 
          <Route path="/testing" component={testing} /> 



        </div>

      </Router>
    );
  }
}

export default App;
