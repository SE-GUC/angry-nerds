import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Payment from './pages/payment'
import logo from './logo.svg';
import './App.css';
import TrackMyCase from './pages/trackMyCase'





class App extends Component {

  //states & functions
  state = {
    case: {
      _id: '5c95094155f85f30d82dcfeb',
      form_type: 'SSCP',
      regulated_law: 'Law 159',
      arabic_name: 'تتتت',
      english_name: 'Hello6',
      government: "ENG",
      city: 'Cairo',
      hq_address: 'gftfy',
      hq_city: 'yes',
      main_center_phone: 123515,
      main_center_fax: 518563,
      currency: '541',
      fees:532,
      equality_capital: 505464562,
      caseStatus: 'pending'
    }
  }


  render() {
    return (
<<<<<<< HEAD
      <div className="App">
        
        <TrackMyCase/>
      </div>
=======
      <Router>
        <div className="App">

          <Route exact path="/" render={props => (
            <React.Fragment>
              <h1>Hello World!</h1>
              <h2> my name is Ramy! </h2>
            </React.Fragment>
          )} />

          <Route exact path="/about" render={props => (
            <React.Fragment>
              <h1>Hello World!</h1>
              <h2> my name is romba! </h2>
            </React.Fragment>
          )} />

          <Route exact path="/payment" render={props => (
            <React.Fragment>
              <Payment case={this.state.case} />
            </React.Fragment>
          )} />



        </div>
      </Router>
>>>>>>> c3a99387f499cb21ad3a9b2469a7a34c473d96c2
    );
  }
}


export default App;
//export default navBar;
