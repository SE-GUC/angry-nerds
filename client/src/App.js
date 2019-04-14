import React, { Component } from 'react';
import { BrowserRouter as Router, Route , Switch} from 'react-router-dom'
import Payment from './pages/payment'
import Notification from './components/notification'
// import './App.css';
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
import ReviewerHome from './pages/ReviewerHome'
import ResetPass from './pages/resetPaassword'
import ChangePricing from './pages/ChangePricing'
import AdminViewLaws from './pages/AdminViewLaws'
import LawyerOpenCase from './pages/LawyerOpenCase'
import ReviewerOpenCase from './pages/ReviewerOpenCase'
import AddLawyer from './components/AddLawyer';
import AdminAddLawyer from './components/AdminAddLawyer';
import AdminAddReviewer from './components/AdminAddReviewer';
import AdminAddAdmin from './components/AdminAddAdmin';
import AddReviewer from './components/AddReviewer';
import testing from './components/testing';
import PrivateRoute from './privateRoute'
import resetPass from './pages/resetPaassword';
import stocks from'./components/stocks';

import mainNavBar from './components/mainNavBar'
import Footer from './components/Footer'
import unregiteredHome from './pages/unregHome'
import AdminSideNavbar from './components/AdminSideNavbar';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'
import InvEditProfile from './pages/InvEditProfile';
import InvViewProfile from './pages/InvViewProfile'
import CreateCase from './pages/CreateCase'
import InvestorsList from './pages/InvestorsList'
library.add(faStroopwafel)




class App extends Component {

  state = {
    
  }



  render() { 
    return (
      <Router>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <div className="App">
        <div className="container">
        <Route component = {mainNavBar} />
        <Switch>
        <Route exact path= "/payment" component = {Payment} />
        <Route exact path = "/LawyerHome" component={LawyerHome} />
        <Route exact path = "/ReviewerHome" component={ReviewerHome} />


          <Route exact path= "/resetPassword" component = {resetPass}/>           
          <PrivateRoute exact path= "/trackMyCase" allowedUsers={['lawyer','reviewer','admin']} component = {TrackMyCase} />
        <Route  exact path = "/home" component = {unregiteredHome}  /> 
      <Route exact path= "/Companies" component = {Companies}/> 
          <Route exact path= "/createCase" component = {CreateCase} />  
          <Route exact path = "/InvestorForm" component={InvestorForm} />
          <Route exact path = "/LawyerForm" component={LawyerForm} />
          <Route exact path = "/AdminAddLawyer" component={AdminAddLawyer} /> 
          <Route exact path = "/AdminAddReviewer" component={AdminAddReviewer} /> 
          <Route exact path = "/AdminAddAdmin" component={AdminAddAdmin} /> 
            <Route exact path="/signUp" component={signup} />
            <Route exact path="/signin" component= {signin} />
            <Route exact path="/AddLawyer" component={AddLawyer} />
          <Route exact path="/AddReviewer" component={AddReviewer} /> 
          <Route  exact path="/testing" component={testing} />
          <Route exact path = "/reviewerHome" component={ReviewerHome} />

          <Route exact path = "/LawyerOpenCase/:id" component={LawyerOpenCase} />
          <Route exact path = "/ReviewerOpenCase/:id" component={ReviewerOpenCase} />

        <Route exact path = "/ChangePricing" component={ChangePricing} />
        <Route exact path ="/AdminPage" component= {AdminSideNavbar}/>
        <Route exact path = "/AdminViewLaws" component={AdminViewLaws} /> 
        <Route exact path = "/stocks" component={stocks} /> 
        <Route exact path = "/InvestorList" component={InvestorsList} /> 
        <Route exact path = "*"  component={() => "404 NOT FOUND"}  />
        <Route exact path ="/InvEditProfile" component= {InvEditProfile}/>
        <Route exact path ="/InvViewProfile" component= {InvViewProfile}/>

          <Route exact path="/notification" render={props => (
            <React.Fragment>
              <Notification notif={this.state.notifications} />
            </React.Fragment>
          )} />

              <Route exact path="/AdminViewLaws" component={AdminViewLaws} />
              <Route exact path="/stocks" component={stocks} />
              <Route exact path="/InvestorList" component={InvestorsList} />
              <Route exact path="*" component={() => "404 NOT FOUND"} />
        
        </Switch>
         </div>
         </div>
         </Router>   
     )
   }
}

export default App;
