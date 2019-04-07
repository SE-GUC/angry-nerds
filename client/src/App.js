import React, { Component } from 'react';
import {BrowserRouter as Router , Route } from 'react-router-dom';
import SignUp from './pages/SignUp'

import './App.css';

class App extends Component {
  render() {
    return (
     <Router>
      <div className="App">

       <Route exact path="/signUp" render={props => (
          <React.Fragment>
            <SignUp  />
          </React.Fragment>
        )} /> 



      </div>
    </Router>
    );
  }
}

export default App;
