import React ,{ Component } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'; 
import Alert from 'react-bootstrap/Alert'; 
import axios from 'axios';
import { Row , Col , Container } from 'react-bootstrap';
import '../App.css'
import Verifypassword from "../components/passwordinReset"
const image1 =require('../Images/logo.png')
const padding = {margin: '20'};

class Resetpass extends Component  {
    state={

    }
    render(){
    return (
    <React.Fragment>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css"/>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
        <Row style={{height: .15*window.innerHeight + 'px'}}>  </Row>
        <legend  class="the-legend" >Reset password</legend>        
        <Col md={{ span: 2, offset: 0 }}> <img src={image1} /> </Col>
        <Col md={{ span: 4, offset: 2 }}> <Verifypassword />  </Col>
   </React.Fragment>
  )
  
}
}


export default Resetpass;