import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Payment from "./pages/payment";
import "./App.css";
import LawyerForm from "./pages/LawyerForm";
import InvestorForm from "./pages/InvestorForm";
import TrackMyCase from "./pages/trackMyCase";
import Companies from "./pages/Companies"; 
import signup from "./pages/signUp";
import signin from "./pages/signin";
import LawyerHome from "./pages/LawyerHome";
import Performance from "./pages/Performance";
import PerformanceHome from "./pages/PerformanceHome";

import ChangePricing from "./pages/ChangePricing";
import AdminViewLaws from "./pages/AdminViewLaws";
import AdminEditLaws from "./pages/AdminEditLaws";

import LawyerOpenCase from "./pages/LawyerOpenCase";
import AddLawyer from "./components/AddLawyer";
import AdminAddLawyer from "./components/AdminAddLawyer";
import AdminAddReviewer from "./components/AdminAddReviewer";
import AdminAddAdmin from "./components/AdminAddAdmin";
import AddReviewer from "./components/AddReviewer";
import CompaniesGroup from './components/CompaniesGroup'
import AdminDeleteInvestor from './pages/AdminDeleteInvestor'
import testing from "./components/testing";
import InvestorEditForm from "./pages/InvestorEditForm";
import mainNavBar from "./components/mainNavBar";
import NotFound from './pages/NotFound'
import unregiteredHome from "./pages/unregHome";
import AdminSideNavbar from "./components/AdminSideNavbar";
import AdminSideNavbarAR from "./components/AdminSideNavbarAR";
import CreateCase from "./pages/CreateCase";
import InvestorsList from "./pages/InvestorsList";
import notificat from "./components/notificat";
import ReviewerHome from "./pages/ReviewerHome";
import ReviewerOpenCase from "./pages/ReviewerOpenCase";
import Questions from "./pages/Questions";
import Verify from "./pages/verification";
import electronicJournal from "./pages/electronicJournal";
import PrivateRoute from "./privateRoute";
import resetPass from "./pages/resetPaassword";
import stocks from "./components/stocks";
//import Noti from './pages/Noti';
import about from "./pages/About";
import changePassword from "./pages/ChangePassword";
import InvEditProfile from "./pages/InvEditProfile";
import InvViewProfile from "./pages/InvViewProfile";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStroopwafel } from "@fortawesome/free-solid-svg-icons";
import { Switch } from "react-router-dom";
import setAuthToken from "./helpers/setAuthToken";
import tryComponent from "./pages/tryComponent"
import anotherMail from "./pages/anotherMail"
import ForgetPassword from "./pages/forgetPassword"

import AdminAnswerDeleteQuestion from "./pages/AdminAnswerDeleteQuestion"


import Faq from './pages/FAQ'
import InvestorPage from "./pages/InvestorPage";
import InvestorPageAR from "./pages/InvestorPageAR";
import ControlledCarousel from './components/ControlledCarousel'

library.add(faStroopwafel);

if (localStorage.jwtToken){
  setAuthToken(localStorage.jwtToken)
}

class App extends Component {
  //states & functions
  state = {};

  render() {
    return (
      <Router>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" />
          <Route component={mainNavBar} />
          
            <div className="container">
            <Switch>

                <Route exact path="/" component={unregiteredHome} />
                <Route exact path="/home" component={unregiteredHome}/>
                <Route exact path="/stocks" component={stocks}/>
                <Route exact path="/Companies" component={Companies}/>
                 <Route exact path="/stocks" component={stocks} />
                <Route exact path="/FAQ" component={Faq} />
                <Route exact path="/signin" component={signin} />

        

                <Route
                  exact
                  path="/"
                  render={props => (
                    <React.Fragment>
                      <h1>Hello World!</h1>
                      <h2> my name is Ramy! </h2>
                    </React.Fragment>
                  )}
                />
                <Route exact path="/trackMyCase" component={TrackMyCase} />
                <Route exact path="/about" component={about} />
                <Route exact path="/resetPassword"  component={resetPass} />
                <Route exact path="/InvestorForm" component={InvestorForm} />
                <Route exact path="/signUp" component={signup} />       
                <Route exact path="/AddLawyer" component={AddLawyer} />
                <Route exact path="/testing" component={testing} />
                <Route exact path="/Performance/:id" component={Performance} />
                <Route exact path="/PerformanceHome" component={PerformanceHome} />
                <Route exact path="/Questions" component={Questions} />
                <Route exact path="/electronicjournal" component={electronicJournal} />
                <Route exact path="/AddReviewer" component={AddReviewer} />
                <Route exact path="/LawyerForm" component={LawyerForm} />
                <Route exact path="/verify/:tok" component={Verify} />
                <Route exact path="/anotherMail/:tok" component={anotherMail} />
                <Route exact path="/ForgetPassword" component={ForgetPassword} />
                <Route exact path="/AdminAnswerDeleteQuestion" component={AdminAnswerDeleteQuestion} />
                <PrivateRoute exact path="/trackMyCase" allowedUsers={['investor']} component={TrackMyCase} />
                <PrivateRoute exact path="/ChangeMyPassword" allowedUsers={['investor','lawyer','reviewer','admin']} component={changePassword} />
                <PrivateRoute exact path="/createCase" allowedUsers={['investor','lawyer']} component={CreateCase} />
                <PrivateRoute exact path = "/AdminDeleteInvestor" allowedUsers={['admin']} component = {AdminDeleteInvestor}/>
                <PrivateRoute exact path="/payment/:id" allowedUsers={['investor']} component={Payment} />
                <PrivateRoute exact path="/InvestorEditForm/:id" allowedUsers={['investor']} component={InvestorEditForm} />
                <PrivateRoute exact path="/ViewMyCompanies" allowedUsers={['investor']} component={Companies} />
                <PrivateRoute exact path="/AdminAddLawyer" allowedUsers={['admin']} component={AdminAddLawyer} />
                <PrivateRoute exact path="/AdminAddAdmin" allowedUsers={['admin']} component={AdminAddAdmin} />
                <Route exact path="/signUp" component={signup} /> 

                <Route exact path="/signin" component={signin} />
                <Route exact path="/AddLawyer" component={AddLawyer} />
                <Route exact path="/AddReviewer" component={AddReviewer} />
                <PrivateRoute exact path="/AdminAddReviewer" allowedUsers={['admin']} component={AdminAddReviewer}   />
                <PrivateRoute exact path="/LawyerHome" allowedUsers={['lawyer']} component={LawyerHome} />
                <PrivateRoute exact path="/LawyerOpenCase/:id" allowedUsers={['lawyer']} component={LawyerOpenCase} />
                <PrivateRoute exact path="/ReviewerOpenCase/:id" allowedUsers={['reviewer']} component={ReviewerOpenCase}   />
                <PrivateRoute exact path="/AdminViewLaws" allowedUsers={['admin']}component={AdminViewLaws} />
                <PrivateRoute exact path="/ChangePricing" allowedUsers={['admin']} component={ChangePricing} />
                <PrivateRoute exact path="/AdminPage" allowedUsers={['admin']} component={AdminSideNavbar} />
                <PrivateRoute exact path="/InvestorPage" allowedUsers={['investor']} component={InvestorPage} />
      {/*prvate route*/}          <PrivateRoute exact path ='/AdminDeleteCase' component={CompaniesGroup}></PrivateRoute>
                <Route exact path="/testing" component={testing} />
                <Route exact path="/Performance/:id" component={Performance} />
                <Route exact path="/PerformanceHome" component={PerformanceHome} />


               
               
             
           
                <Route exact path="/Questions" component={Questions} />
                <PrivateRoute exact path="/notificat" allowedUsers={['investor']} component={notificat} />
                <PrivateRoute exact path="/InvestorList" allowedUsers={['lawyer','reviewer','admin']}  component={InvestorsList} />
                <Route exact path="/InvEditProfile" allowedUsers={['investor']} component={InvEditProfile}/>
                <PrivateRoute exact path="/InvViewProfile" allowedUsers={['investor']} component={InvViewProfile} />
                <PrivateRoute exact path="/ReviewerHome" allowedUsers={['reviewer']} component={ReviewerHome} />


                <Route exact path="*" render={props => (<React.Fragment >
                      <h1>Error 404!</h1>
                      <h2>Page not found </h2>
                    </React.Fragment>
                  )} />
                </Switch>
            
              </div>
          
      </Router>
    );
  }
}
export default App;