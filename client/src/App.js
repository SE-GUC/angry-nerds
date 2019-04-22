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
import ChangePricing from "./pages/ChangePricing";
import AdminViewLaws from "./pages/AdminViewLaws";
import LawyerOpenCase from "./pages/LawyerOpenCase";
import AddLawyer from "./components/AddLawyer";
import AdminAddLawyer from "./components/AdminAddLawyer";
import AdminAddReviewer from "./components/AdminAddReviewer";
import AdminAddAdmin from "./components/AdminAddAdmin";
import AddReviewer from "./components/AddReviewer";
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
          <Switch>
        <Route exact path="/stocks" component={stocks} />
            <Route exact path="/home" component={unregiteredHome} />
            <div className="container">
              <Route exact path="/Companies" component={Companies} />
              <div className="col-sm-10">
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
                  <Route exact path = "/AdminDeleteInvestor" component = {AdminDeleteInvestor}/>
                <Route exact path="/ReviewerHome" component={ReviewerHome} />
                <Route
                  exact
                  path="/ChangeMyPassword"
                  component={changePassword}
                />
                <Route exact path="/resetPassword" component={resetPass} />
                <Route exact path="/payment/:id" component={Payment} />
                <Route exact path="/createCase" component={CreateCase} />
                <Route exact path="/InvestorForm" component={InvestorForm} />
                <Route exact path="/LawyerForm" component={LawyerForm} />
                <Route
                  exact
                  path="/InvestorEditForm/:id"
                  component={InvestorEditForm}
                />
                <Route exact path="/ViewMyCompanies" component={Companies} />
                <Route
                  exact
                  path="/AdminAddLawyer"
                  component={AdminAddLawyer}
                />
                <Route
                  exact
                  path="/AdminAddReviewer"
                  component={AdminAddReviewer}  
                />
                <Route exact path="/AdminAddAdmin" component={AdminAddAdmin} />
                <Route exact path="/signUp" component={signup} />       
                <Route exact path="/signin" component={signin} />
                <Route exact path="/AddLawyer" component={AddLawyer} />
                <Route exact path="/AddReviewer" component={AddReviewer} />
                <Route exact path="/testing" component={testing} />
                <Route exact path="/LawyerHome" component={LawyerHome} />
                <Route
                  exact
                  path="/LawyerOpenCase/:id"
                  component={LawyerOpenCase}
                />
                <Route
                  exact
                  path="/ReviewerOpenCase/:id"
                  component={ReviewerOpenCase}
                />
                <Route exact path="/ChangePricing" component={ChangePricing} />
                <Route exact path="/ChangePricing" component={ChangePricing} />
                <Route exact path="/AdminViewLaws" component={AdminViewLaws} />
                <Route exact path="/AdminPage" component={AdminSideNavbarAR} />
                <Route exact path="/InvestorPage" component={InvestorPageAR} />
                <Route exact path="/Questions" component={Questions} />
                <Route exact path="/notificat" component={notificat} />
                <Route
                  exact
                  path="/electronicjournal"
                  component={electronicJournal}
                />
                <Route exact path="/InvestorList" component={InvestorsList} />
                <Route
                  exact
                  path="/InvEditProfile"
                  component={InvEditProfile}
                />
                <Route
                  exact
                  path="/InvViewProfile"
                  component={InvViewProfile}
                />
                 <Route exact path="/me" component={NotFound} />
                <Route exact path="/verify/:tok" component={Verify} />
                  
              </div>
            </div>
            <Route exact path="*" component={NotFound} />
          </Switch>
      </Router>
    );
  }
}
export default App;
