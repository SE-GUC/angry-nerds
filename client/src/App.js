import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import LawyerHome from './pages/LawyerHome'
import ChangePricing from './pages/ChangePricing'
import AdminViewLaws from './pages/AdminViewLaws'

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path = "/LawyerHome" component={LawyerHome} />
        <Route exact path = "/ChangePricing" component={ChangePricing} />
        <Route exact path = "/AdminViewLaws" component={AdminViewLaws} />
      </Router>
    );
  }
}

export default App;
