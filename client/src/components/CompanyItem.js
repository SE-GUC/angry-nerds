import React, { Component } from "react";
import {Card,Button,CardHeader,CardBody,ProgressBarReactFragment,Row,Col,CardTitle} from "reactstrap";
import { IconContext} from "react-icons";
import axios from 'axios'
//import {IoIosHomeOutline} from 'react-icons/io'
import ProgressBar from 'react-bootstrap/ProgressBar'
import StepProgressBar from './stepProgressBar'
export class CompanyItem extends Component {

  constructor(props){
    super(props)
  }
  state={
    color:'',
    percentage:0
  }
  async change(event)
  {
    event.preventDefault();
    try{
    await axios({
      method: 'delete',
      url:'http://127.0.0.1:3000/AdminDeleteCase/'+this.props.company._id,
      headers: {}, 
      data: { 
      }
    });
    alert('Successfully')
    window.location.replace('/ShowCompanies')

  }
  catch(e)
  {
    console.log(e)
    alert(e.error)
  }

  }
  setColor()
  {
    
    
  }
  componentDidMount() {
    if(this.props.company.caseStatus==='investor')
    {
      this.setState({
        color:'danger',
        percentage:20
      });
    }

    if(this.props.company.caseStatus==='lawyer-investor')
    {
      this.setState({
        color:'warning',
        percentage:40
      });
    }
    if(this.props.company.caseStatus==='lawyer-reviewer')
    {
      this.setState({
        color:'warning',
        percentage:40
      });
    }
    if(this.props.company.caseStatus==='reviewer')
    {
      this.setState({
        color:'warning',
        percentage:40
      });
    }
    if(this.props.company.caseStatus==='pending')
    {
      this.setState({
        color:'primary',
        percentage:70
      });
    }
    if(this.props.company.caseStatus==='published')
    {
      this.setState({
        color:'success',
        percentage:100
      });
    }
  }
  render() {
    const bg = "light"
    const text = "black"
    return (

<div class="w-70">
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css"
        />

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js" />

        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js" />

        <Card body outline color="primary"  className="rounded-200">
          <CardHeader>
            <IconContext.Provider
              value={{ color: "#286090", className: "global-class-name", size:"3em" }}>
              <div>
              </div>
            </IconContext.Provider>
            {this.props.company.english_name + " " + this.props.company.arabic_name}
          </CardHeader>
          <CardBody> 
          <ProgressBar animated  variant={this.state.color} now={this.state.percentage} />
            <Row>
              <Col float="left">
                <CardTitle>
                  Form type: {this.props.company.form_type}
                  <br />
                  Case status: {this.props.company.caseStatus}
                  <br/>
                 Comapny id: {this.props.company._id}
                </CardTitle>
              </Col>
              
            </Row>
            <Row float='right'>
            <Button color="danger" onClick= {this.change.bind(this)}>
                  Delete Case
                </Button>
                </Row>
          </CardBody>
          </Card>
          </div>
 
    );
  }
}

export default CompanyItem;