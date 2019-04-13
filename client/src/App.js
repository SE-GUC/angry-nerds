import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
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
import ChangePricing from './pages/ChangePricing'
import AdminViewLaws from './pages/AdminViewLaws'
import LawyerOpenCase from './pages/LawyerOpenCase'
import AddLawyer from './components/AddLawyer';
import AddReviewer from './components/AddReviewer';
import testing from './components/testing';
import mainNavBar from './components/mainNavBar'
import Footer from './components/Footer'
import unregiteredHome from './pages/unregHome'




class App extends Component {

  
  //states & functions
  state = {
      notifications: [],
      case:
      {
        _id: "5c95094155f85f30d82dcfeb",
        form_type: "SSCP",
        regulated_law: "masr",
        arabic_name: "تتتت",
        english_name: "Hello6",
        government: "ENG",
        city: "Cairo",
        hq_address: "gftfy",
        hq_city: "yes",
        main_center_phone: 123515,
        main_center_fax: 518563,
        currency: "541",
        equality_capital: 5054641641562,
        caseStatus: "published",
        investorID: "5ca772654d70710fa843bd5f",
    }
  }


 
   componentWillUnmount() {
     clearInterval(this.state)
   }


  render() {
    
    return (
      <Router>



    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        
        <Route component = {mainNavBar} />
        <Route exact path= "/Companies" component = {Companies}/>
        <Route  exact path = "/home" component = {unregiteredHome}  /> 
        <div className="container">

          <Route exact path= "/trackMyCase" component = {TrackMyCase} />

          <Route exact path="/about" render={props => (
            <React.Fragment>
              <h1>Hello World!</h1>
              <h2> my name is romba! </h2>
            </React.Fragment>
          )} />
          <Route exact path="/payment" render={props => (
            <React.Fragment>
              <Payment case = {this.state.case} />
            </React.Fragment>
          )} />

        
          <Route exact path = "/InvestorForm" component={InvestorForm} />
          <Route exact path = "/LawyerForm" component={LawyerForm} />


          <Route exact path = '/ViewMyCompanies' component =  {Companies}/>
            <Route exact path="/signUp" component={signup} />
            <Route exact path="/signin" component= {signin} />
            <Route exact path="/AddLawyer" component={AddLawyer} />
          <Route exact path="/AddReviewer" component={AddReviewer} /> 
          <Route  exact path="/testing" component={testing} />
          <Route exact path = "/LawyerHome" component={LawyerHome} />
          <Route exact path = "/LawyerOpenCase/:id" component={LawyerOpenCase} />
        <Route exact path = "/ChangePricing" component={ChangePricing} />
        <Route exact path = "/AdminViewLaws" component={AdminViewLaws} /> 


          <Route exact path="/notification" render={props => (
            <React.Fragment>
              <Notification notif={this.state.notifications} />
            </React.Fragment>
          )} />
        </div>
        
        
        
        {/*  <Route component ={Footer} /> */}

      </Router>
     );
   }
  
}


export default App;
