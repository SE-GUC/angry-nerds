import React ,{ Component } from 'react'
import Alert from 'react-bootstrap/Alert'; 
import { Redirect } from 'react-router-dom'
import jwt from 'jsonwebtoken'
import axios from 'axios';
import {Button,InputGroup,FormControl,Row,Col,Form} from "react-bootstrap";
import '../App.css'
import Verifypassword from "../components/passwordinReset"
const image1 =require('../Images/logo.png')
const padding = {margin: '20'};

class Resetpass extends Component  {
  state = {
    password:"",
    confirmPassword:"",
    type1: 'password',
    type2: 'password',
    lowerCase:"text-danger",
    upperCase:"text-danger",
    number:"text-danger",
    minimum:"text-danger",
    confirmed:"text-danger",
    lowerCaseText:"✖ LowerCase",
    upperCaseText:"✖ UpperCase",
    numberText:"✖ Number",
    minimumText:"✖ Minimum Length 8",
    confirmedText:"✖ Match",
    passwordFlag:true,
    matchFlag:true,
    submitButton:true
  }

  componentWillMount(){
      // this.match1(this.state.confirmPassword)
  }
  validate (e){
    const pass = e.target.value
    this.setState({password:pass})
    this.match1(this.state.confirmPassword,pass)
        const lowerCaseLetters = /[a-z]/g;
        const upperCaseLetters = /[A-Z]/g;
        const numbers = /[0-9]/g;

        if (lowerCaseLetters.test(pass)){
            this.setState({lowerCase:"text-success"})  
            this.setState({lowerCaseText:"✔ LowerCase"})
        }else{
            this.setState({lowerCase:"text-danger"})
            this.setState({lowerCaseText:"✖ LowerCase"})        
        }

        if (upperCaseLetters.test(pass)){
            this.setState({upperCase:"text-success"})
            this.setState({upperCaseText:"✔ UpperCase"})            
        }else{
            this.setState({upperCase:"text-danger"})
            this.setState({upperCaseText:"✖ UpperCase"})            
        }

        if (pass.length>7){
            this.setState({minimum:"text-success"})
            this.setState({minimumText:"✔ Minimum Length 8"})            
       }else{
           this.setState({minimum:"text-danger"})
           this.setState({minimumText:"✖ Minimum Length 8"})            
       }

        if (numbers.test(pass)){
            this.setState({number:"text-success"})
            this.setState({numberText:"✔ Number"})    
        }else{
            this.setState({number:"text-danger"})    
            this.setState({numberText:"✖ Number"})
        }

  }
  
  match(e){
    const pass = e.target.value
    this.setState({confirmPassword:pass})
    if (pass===this.state.password){
        this.setState({confirmed:"text-success"})
        this.setState({confirmedText:"✔ Match"})
        this.setState({matchFlag:false}) 
    }else{
        this.setState({confirmed:"text-danger"})    
        this.setState({confirmedText:"✖ Match"})
        this.setState({matchFlag:true}) 
    }
  }

  match1(pass,x){
    if (pass===x){
        this.setState({confirmed:"text-success"})
        this.setState({confirmedText:"✔ Match"}) 
        this.setState({matchFlag:false}) 
      }else{
        this.setState({confirmed:"text-danger"})    
        this.setState({confirmedText:"✖ Match"})
        this.setState({matchFlag:true}) 
    }
  }

  handleClick1 = () => this.setState(({type1}) => ({
    type1: type1 === 'text' ? 'password' : 'text'
  }))

  handleClick2 = () => this.setState(({type2}) => ({
    type2: type2 === 'text' ? 'password' : 'text'
  }))

  submit(){
    try {
      const token = this.props.match.params.tok
      console.log(token)
      const decoded = jwt.decode(token)
          axios({
              method: "put",
              url: 'http://localhost:3000/resetpassword/' + token ,
              data: {
                password:this.state.password
              }
            }).then(res => console.log(res))
            .catch(error => console.log(error))
          }
          catch(e){
              console.log(e)
          }
  }
    render(){
      
      const token = this.props.match.params.tok
      const decoded = jwt.decode(token)
      console.log(Date.now())
      console.log(decoded.exp)
      if ((decoded.exp*1000)<Date.now()){

      return <Redirect to={{pathname:'/anotherMail/'+token}} />

      }
      else{
    return (
    <React.Fragment>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css"/>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
        <Row style={{height: .15*window.innerHeight + 'px'}} /> 
        <legend  class="the-legend" style={{color: "#428bca"}}>Reset password</legend>        
        <Col md={{ span: 2, offset: 0 }}> <Row style={{height: .04*window.innerHeight + 'px'}} /><img src={image1} /> </Col>
        <Col md={{ span: 4, offset: 2 }}> 

        <InputGroup className="mb-3">
        <Form.Label style={{color: "#428bca"}}>Password</Form.Label>
        <FormControl type={this.state.type1} placeholder="Enter your new password" ref="psw" 
            onChange={(e) => {this.validate(e)}}  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"  required
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"/>
        <InputGroup.Append>
          <Button className="glyphicon glyphicon-eye-open" variant="outline" onClick={this.handleClick1} />
        </InputGroup.Append>
      </InputGroup>
      <InputGroup className="mb-3">
      <Row>
          <Col md={{ span: 0, offset: 1 }}>
          <p className={this.state.lowerCase} >{this.state.lowerCaseText}</p>
          </Col>
          <Col md={{ span: 0, offset: 3 }}>
          <p className={this.state.upperCase}>{this.state.upperCaseText}</p>
          </Col>            
        </Row>
        <Row>
        <Col md={{ span: 0, offset: 1 }}>
            <p className={this.state.minimum}>{this.state.minimumText}</p>          
          </Col>
          <Col md={{ span: 0, offset: 1 }}>
           <p className={this.state.number}>{this.state.numberText}</p>          
          </Col>       
        </Row></InputGroup>
      <InputGroup className="mb-3">
      <Form.Label style={{color: "#428bca"}}>Confirm password</Form.Label>
      <FormControl type={this.state.type2} placeholder="Confirm your new password" 
          onChange={(e) => {this.match(e)}} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required
          title="Must match the password you entered before"/>
      <InputGroup.Append>
        <Button className="glyphicon glyphicon-eye-open" variant="outline" onClick={this.handleClick2} />
      </InputGroup.Append>
    </InputGroup>
    <InputGroup className="mb-3">
    <Row>
          <Col md={{ span: 0, offset: 1 }}>
          <p className={this.state.confirmed}>{this.state.confirmedText}</p>
          </Col>           
    </Row>
    </InputGroup>
  
    <Col md={{ span: 0, offset: 8 }}>
        <Button type="submit" disabled={this.state.matchFlag} onClick={this.submit.bind(this)} >Reset</Button></Col>
        
        </Col>
   </React.Fragment>
  )
    }
 }
}


export default Resetpass;