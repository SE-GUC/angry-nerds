import React, { Component } from 'react';
import { BrowserRouter as Router, Route , Switch} from 'react-router-dom'
import Payment from './pages/payment'
import Notification from './components/notification'
import './App.css';
import LawyerForm from './pages/LawyerForm'
import InvestorForm from './pages/InvestorForm'
import axios from 'axios'
import SideNav from './layout/sideNav'
import TrackMyCase from './pages/trackMyCase'
import Companies from './pages/Companies';
import signup from './pages/signUp'
import signin from './pages/signin'
import home from './pages/home'
import LawyerHome from './pages/LawyerHome'
import ResetPass from './pages/resetPaassword'
import ChangePricing from './pages/ChangePricing'
import AdminViewLaws from './pages/AdminViewLaws'
import AddLawyer from './components/AddLawyer';
import AddReviewer from './components/AddReviewer';
import testing from './components/testing';
import PrivateRoute from './privateRoute'
import resetPass from './pages/resetPaassword';




class App extends Component {

  state = {
    
  }



  render() {
    
    return (
      <Router>
        <div className="App">
        <Switch>
          <Route exact path= "/Companies" component = {Companies}/>
          <Route exact path= "/resetPassword" component = {resetPass}/>           
          <Route exact path="/" render={props => (
            <React.Fragment>
              <h1>Hello World!</h1>
              <h2> my name is Ramy! </h2>
            </React.Fragment>
          )} />
          <PrivateRoute exact path= "/trackMyCase" allowedUsers={['lawyer','reviewer','admin']} component = {TrackMyCase} />
          <PrivateRoute exact path = "/InvestorForm" component={InvestorForm} />
          <Route exact path = "/LawyerForm" component={LawyerForm} />
          <Route exact path = '/ViewMyCompanies' component =  {Companies}/>
          <Route  exact path = "/home" component = {home}  />
            <Route exact path="/signUp" component={signup} />
            <Route exact path="/signin" component= {signin} />
            <Route exact path="/AddLawyer" component={AddLawyer} />
          <Route exact path="/AddReviewer" component={AddReviewer} /> 
          <Route  exact path="/testing" component={testing} />
          <Route exact path = "/LawyerHome" component={LawyerHome} />
        <Route exact path = "/ChangePricing" component={ChangePricing} />
        <Route exact path = "/AdminViewLaws" component={AdminViewLaws} /> 
        <Route exact path = "*"  component={() => "404 NOT FOUND"}  />       
        </Switch>
        </div>
        
      </Router>
     );
   }
  
}


export default App;
//export default navBar;
