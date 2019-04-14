import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Payment from "./pages/payment";
import Notification from "./components/notification";
// import './App.css';
import LawyerForm from "./pages/LawyerForm";
import InvestorForm from "./pages/InvestorForm";
import axios from "axios";
import SideNav from "./layout/sideNav";
import TrackMyCase from "./pages/trackMyCase";
import Companies from "./pages/Companies";
import signup from "./pages/signUp";
import signin from "./pages/signin";
import home from "./pages/home";
import LawyerHome from "./pages/LawyerHome";
import ChangePricing from "./pages/ChangePricing";
import AdminViewLaws from "./pages/AdminViewLaws";
import LawyerOpenCase from "./pages/LawyerOpenCase";
import AddLawyer from "./components/AddLawyer";
import AdminAddLawyer from "./components/AdminAddLawyer";
import AdminAddReviewer from "./components/AdminAddReviewer";
import AdminAddAdmin from "./components/AdminAddAdmin";
import AddReviewer from "./components/AddReviewer";
import testing from "./components/testing";
import test from "./components/test";
import InvestorEditForm from './pages/InvestorEditForm'
import mainNavBar from "./components/mainNavBar";
import Footer from "./components/Footer";
import unregiteredHome from "./pages/unregHome";
import AdminSideNavbar from "./components/AdminSideNavbar";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStroopwafel } from "@fortawesome/free-solid-svg-icons";
import CreateCase from "./pages/CreateCase";
import InvestorsList from "./pages/InvestorsList";
library.add(faStroopwafel);

class App extends Component {
  //states & functions
  state = {};

  render() {
    return (
      <Router>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" />

        <Route component={mainNavBar} />
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

            <Route
              exact
              path="/about"
              render={props => (
                <React.Fragment>
                  <h1>Hello World!</h1>
                  <h2> my name is romba! </h2>
                </React.Fragment>
              )}
            />

            <Route exact path="/payment/:id" component={Payment} />
            <Route exact path="/createCase" component={CreateCase} />
            <Route exact path="/InvestorForm" component={InvestorForm} />
            <Route exact path="/LawyerForm" component={LawyerForm} />
            <Route exact path="/InvestorEditForm/:id" component={InvestorEditForm} />       
            <Route exact path="/ViewMyCompanies" component={Companies} />
            <Route exact path="/home" component={home} />
            {/* <Route exact path="/signUp" component={signup} /> */}
            <Route exact path="/AdminAddLawyer" component={AdminAddLawyer} />
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
            <Route exact path="/ChangePricing" component={ChangePricing} />
            <Route exact path="/AdminViewLaws" component={AdminViewLaws} />
            <Route exact path="/AdminPage" component={AdminSideNavbar} />

            <Route exact path="/InvestorList" component={InvestorsList} />

            <Route
              exact
              path="/notification"
              render={props => (
                <React.Fragment>
                  <Notification notif={this.state.notifications} />
                </React.Fragment>
              )}
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
