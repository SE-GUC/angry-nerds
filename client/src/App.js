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
import CompaniesGroup from './components/CompaniesGroup'
import AddLawyer from "./components/AddLawyer";
import AddLawyer_AR from "./components/AddLawyer_AR";
import AdminAddLawyer from "./components/AdminAddLawyer";
import AdminAddLawyer_AR from "./components/AdminAddLawyer_AR";
import AdminAddReviewer from "./components/AdminAddReviewer";
import AdminAddReviewer_AR from "./components/AdminAddReviewer_AR";
import AdminAddAdmin from "./components/AdminAddAdmin";
import AdminAddAdmin_AR from "./components/AdminAddAdmin_AR";
import AddReviewer from "./components/AddReviewer";
import AddReviewer_AR from "./components/AddReviewer_AR";
import AdminDeleteInvestor from './pages/AdminDeleteInvestor'
import testing from "./components/testing";
import InvestorEditForm from "./pages/InvestorEditForm";
import mainNavBar from "./components/mainNavBar";
import footer from "./layout/footer";
import MainNavBar from "./components/mainNavBar";
import NotFound from './pages/NotFound'
import unregiteredHome from "./pages/unregHome";
import AdminSideNavbar from "./components/AdminSideNavbar";
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
import UploadPic from "./components/UploadPic";
import FetchImage from "./components/FetchImage";

//import Noti from './pages/Noti';
import about from "./pages/About";
import changePassword from "./pages/ChangePassword";
import InvEditProfile from "./pages/InvEditProfile";
import InvViewProfile from "./pages/InvViewProfile";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStroopwafel } from "@fortawesome/free-solid-svg-icons";
import { Switch } from "react-router-dom";
import Step from './components/stepProgressBar'
import setAuthToken from "./helpers/setAuthToken";
import tryComponent from "./pages/tryComponent"
import anotherMail from "./pages/anotherMail"
import ForgetPassword from "./pages/forgetPassword"
library.add(faStroopwafel);

if (localStorage.jwtToken){
  setAuthToken(localStorage.jwtToken)
}

class App extends Component {
  //states & functions
  state = {
    user:'user'
  };



  render() {
    return (
      <Router>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" />
          
          {/* <Route  component={MainNavBar} /> */}
          <Route  component={()=>this.state.user==='user'? <MainNavBar /> : <Companies/>} />

          <Switch>
        <Route exact path="/stocks" component={stocks} />
        <Route exact path="/UploadPic" component={UploadPic} />
        <Route exact path="/FetchImage" component={FetchImage} />
        




            <Route exact path="/home" component={unregiteredHome} />
            <div className="container">
            
            
              <Route exact path="/Companies" component={Companies} />
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
                
                <PrivateRoute exact path="/trackMyCase" component={TrackMyCase} />
                <Route exact path="/about" component={about} />
                  <Route exact path = "/AdminDeleteInvestor" component = {AdminDeleteInvestor}/>


                <Route exact path="/ReviewerHome" component={ReviewerHome} />

                <Route exact path="/ChangeMyPassword" component={changePassword}/>
                <Route exact path="/resetPassword" component={resetPass} />
                <Route exact path="/payment/:id" component={Payment} />
                <Route exact path="/createCase" component={CreateCase} />
                <Route exact path="/InvestorForm" component={InvestorForm} />
                <Route exact path ='/AdminDeleteCase' component = {CompaniesGroup}/>
                <Route exact path="/LawyerForm" component={LawyerForm} />
                <Route exact path="/InvestorEditForm/:id" component={InvestorEditForm}
                />
                <Route exact path="/ViewMyCompanies" component={Companies} />
                {/* <Route exact path="/signUp" component={signup} /> */}
                <Route exact path="/AdminAddLawyer" component={AdminAddLawyer} />
                <Route exact path="/AdminAddLawyer_AR" component={AdminAddLawyer_AR} />

                <Route exact path="/AdminAddReviewer" component={AdminAddReviewer}  />
                <Route exact path="/AdminAddReviewer_AR" component={AdminAddReviewer_AR}  />
                <Route exact path="/AdminAddAdmin" component={AdminAddAdmin} />
                <Route exact path="/AdminAddAdmin_AR" component={AdminAddAdmin_AR} />
                <Route exact path="/signUp" component={signup} />
                <Route exact path="/signin" component={signin} />
                <Route exact path="/AddLawyer" component={AddLawyer} />
                <Route exact path="/AddLawyer_AR" component={AddLawyer_AR} />
                <Route exact path="/AddReviewer" component={AddReviewer} />
                <Route exact path="/AddReviewer_AR" component={AddReviewer_AR} />
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
                <Route exact path="/AdminPage" component={AdminSideNavbar} />
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
                <Route exact path="/anotherMail/:tok" component={anotherMail} />
                <Route exact path="/ForgetPassword" component={ForgetPassword} />

                
              </div>
            
            <Route exact path="*" component={NotFound} />
            
          </Switch>
          <Route exact path="/home" component={footer} />



          
      </Router>
    );
  }
}
export default App;
