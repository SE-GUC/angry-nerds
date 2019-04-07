import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import signup from './pages/signup'
import signin from './pages/signin'
import home from './pages/home'
class App extends Component {
  
  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
          <Route  exact path = "/home" component = {home}  />
            <Route exact path="/signup" component={signup} />
            <Route exact path="/signin" component= {signin} />
          </div>  
        </div>
      </Router>
    );
  }
  
}

export default App;
