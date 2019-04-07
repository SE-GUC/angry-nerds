import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Payment from './pages/payment'
import Notification from './components/notification'
import './App.css';
import LawyerForm from './pages/LawyerForm'

import SideNav from './layout/sideNav'
import TrackMyCase from './pages/trackMyCase'




class App extends Component {

  
  //states & functions
  state = {
      notifications: []
  }

  componentDidMount() {
    setInterval(() => axios.get('http://localhost:3000/investorMyNotifications/5ca772654d70710fa843bd5f')
    .then(res =>{
      this.setState({ notifications: res.data.data })
    } ), 1000)
    
      
  }

 
   componentWillUnmount() {
     clearInterval(this.state)
   }


  render() {
    return (
      <Router>
        <div className="App">
        <div className="row">
          <div className="col-sm-2">
          <SideNav />
          </div>
          <div className="col-sm-10">
          <Route exact path="/" render={props => (
            <React.Fragment>
              <h1>Hello World!</h1>
              <h2> my name is Ramy! </h2>
            </React.Fragment>
          )} />
          <Route exact path= "/trackMyCase" component = {TrackMyCase} />

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

        
          <Route exact path = "/InvestorForm" component={InvestorForm} />
          <Route exact path = "/LawyerForm" component={LawyerForm} />



          <Route exact path="/notification" render={props => (
            <React.Fragment>
              <Notification notif={this.state.notifications} />
            </React.Fragment>
          )} />
        </div>
        
        </div>
        
        
        </div>
      </Router>
     );
   }
}


export default App;
//export default navBar;
