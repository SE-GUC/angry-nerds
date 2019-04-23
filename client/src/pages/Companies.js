import React, { Component } from "react";
import CaseCard from "../components/CaseCard";
import LawyerToolbar from "../components/LawyerToolbar";
import Spinner from "react-bootstrap/Spinner";
import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Button from "react-bootstrap/Button";

const bg = "light";
const text = "black";
class Companies extends Component {
  state = {
    pubCases: [],
    pendCases: [],
    lang: "En"
  };

  componentDidMount() {
    try {
      axios
        .get("http://localhost:3000/viewMyPublishedCompanies")
        .then(res => this.setState({ pubCases: res.data.data }));
      axios
        .get("http://localhost:3000/viewMyPendingCompanies")
        .then(res => this.setState({ pendCases: res.data.data }));
    } catch (error) {
      console.log(error);
    }
  }

  Pub() {
    return this.state.pubCases.map(aCase => (
      <div className="p-1">
        <Card bg={bg} text={text}>
          <Card.Header>
            <div className="float-left">{aCase.english_name}</div>
          </Card.Header>

          <Card.Body>
            <div className="ml-auto p-2 bd-highlight">
              <Card.Text className="float-left" style={{ textAlign: "left" }}>
                Case ID: <samp>{aCase._id} </samp>
                <br />
                Case Type: {aCase.form_type}$
              </Card.Text>
              <Button
                className="float-right"
                style={{ backgroundColor: "#286090", border: "#286090" }}
                onClick={ (e) =>{
                   e.preventDefault()
                  this.props.history.push('viewCompany/' + aCase._id)
                } 
                }
              >
              View Case 
                {/* <a href=" ViewMyCompany/aCase._id"> </a> */}
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    ));
  }

  PubAr() {
    return this.state.pubCases.map(aCase => (
      <div className="p-1">
        <Card bg={bg} text={text}>
          <Card.Header>
            <div className="float-left">{aCase.arabic_name}</div>
          </Card.Header>

          <Card.Body>
            <div className="ml-auto p-2 bd-highlight">
              <Card.Text className="float-left" style={{ textAlign: "right" }}>
                رقم القضية: <samp>{aCase._id} </samp>
                <br />
                {aCase.form_type} $نوع القضية:
              </Card.Text>
              <Button
                className="float-right"
                style={{ backgroundColor: "#286090", border: "#286090" }}
                onClick={ (e) =>{
                  e.preventDefault()
                 this.props.history.push('viewCompany/' + aCase._id)
               } 
               }
              >
                 تابع القضية 
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    ));
  }

  Pend() {
    return this.state.pendCases.map(aCase => (
      <div className="p-1">
        <Card bg={bg} text={text}>
          <Card.Header>
            <div className="float-left">{aCase.english_name}</div>
          </Card.Header>

          <Card.Body>
            <div className="ml-auto p-2 bd-highlight">
              <Card.Text className="float-left" style={{ textAlign: "left" }}>
                Case ID: <samp>{aCase._id} </samp>
                <br />
                Case Type: {aCase.form_type}$
              </Card.Text>
              <Button
                className="float-right"
                style={{ backgroundColor: "#286090", border: "#286090" }}
                onClick={ (e) =>{
                  e.preventDefault()
                 this.props.history.push('viewCompany/' + aCase._id)
               } 
               }
              >
                 View Case 
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    ));
  }

  PendAr() {
    return this.state.pendCases.map(aCase => (
      <div className="p-1">
        <Card bg={bg} text={text}>
          <Card.Header>
            <div className="float-left">{aCase.arabic_name}</div>
          </Card.Header>

          <Card.Body>
            <div className="ml-auto p-2 bd-highlight">
              <Card.Text className="float-left" style={{ textAlign: "left" }}>
                رقم القضية: <samp>{aCase._id} </samp>
                <br />
                نوع القضية: {aCase.form_type}$
              </Card.Text>
              <Button
                className="float-right"
                style={{ backgroundColor: "#286090", border: "#286090" }}
                onClick={ (e) =>{
                  e.preventDefault()
                 this.props.history.push('viewCompany/' + aCase._id)
               } 
               }
              >
                 تابع القضية
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    ));
  }

  render() {
    if (this.state.lang === "En") {
      return (
        <div>
          <h1>Published companies</h1>
          {this.Pub()}
          <h1>Pending companies</h1>
          {this.Pend()}
        </div>
      );
    } else {
      return (
        <div>
          <h1>قواضي نشرت</h1>
          {this.PubAr()}
          <h1>قواضي لم تنشر بعد</h1>
          {this.PendAr()}
        </div>
      );
    }
  }
}

export default Companies;
