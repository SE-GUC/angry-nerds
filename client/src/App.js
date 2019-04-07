import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import LawyerHome from './pages/LawyerHome'
import ChangePricing from './pages/ChangePricing'
import AdminViewLaws from './pages/AdminViewLaws'

import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
 import AddLawyer from './components/AddLawyer';
 import AddReviewer from './components/AddReviewer';
 import testing from './components/testing';




class App extends Component {
  render() {
    return (
      <Router>
<<<<<<< HEAD
        <div>
          {/* <Route exact path = "/" component={AddLawyer}/> */}
          <Route path="/lawyer" component={AddLawyer} />
          <Route path="/reviewer" component={AddReviewer} /> 
          <Route path="/testing" component={testing} /> 



        </div>

=======
        <Route exact path = "/LawyerHome" component={LawyerHome} />
        <Route exact path = "/ChangePricing" component={ChangePricing} />
        <Route exact path = "/AdminViewLaws" component={AdminViewLaws} />
>>>>>>> e657e22cd6b0c1d0c3bdba27086f2c4b0e72e9bb
      </Router>
    );
  }
}

export default App;
