import React ,{ Component } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'; 
import Alert from 'react-bootstrap/Alert'; 
import { Redirect } from 'react-router-dom'
import jwt from 'jsonwebtoken'
import axios from 'axios';
import {InputGroup,FormControl,Row,Col,Card} from "react-bootstrap";

import '../App.css'
import Verifypassword from "../components/passwordinReset"
const image1 =require('../Images/logo.png')
const padding = {margin: '20'};

class ForgetPassword extends Component  {
    state={
        email:''
    }
    mail(){
      axios({
        method: "put",
        url: 'http://localhost:3000/forgotpassword',
        data: {
          email : this.state.email
        }
      }).then(res => alert(res.data.message))
      .catch(error => alert("Please write a valid email"))
    }
    render(){
    return (
    <React.Fragment>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css"/>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
        <Row style={{height: .15*window.innerHeight + 'px'}}>  </Row>
        <legend  class="the-legend" style={{color: "#428bca"}}>Forget password</legend>        
        <Col md={{ span: 2, offset: 2 }}> <img src={image1} /> </Col>
        <Col md={{ span: 4, offset: 1 }}> 
        <Row style={{height: .05*window.innerHeight + 'px'}}>  </Row>
        <InputGroup className="mb-3">
        <Form.Label style={{color: "#428bca"}}>Email address</Form.Label>
        <FormControl type="mail" placeholder="mail@example.com" 
        onChange={(e) => {this.setState({email:e.target.value})}} />
      </InputGroup>
      <Row style={{height: .03*window.innerHeight + 'px'}} />
      <Col md={{ span: 4, offset: 8 }}>
      <Button onClick={this.mail.bind(this)}>Send</Button></Col>
      <Row style={{height: .07*window.innerHeight + 'px'}} />
      <Col md={{ span: 12, offset: 10 }}>
      <Card.Link href="#" onClick={this.mail.bind(this)}>Click here to resend mail</Card.Link></Col>
      </Col>

        
   </React.Fragment>
  )
    
}
}


export default ForgetPassword