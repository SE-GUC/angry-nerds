import React ,{ Component } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'; 
import jwt from 'jsonwebtoken'
import axios from 'axios';
import {InputGroup,FormControl,Row,Col,Card} from "react-bootstrap";
import '../App.css'
import { Route, Redirect } from 'react-router-dom'
import setAuthToken from '../helpers/setAuthToken';
const padding = {margin: '20'};
const image1 =require('../Images/logo.png')

class signinArabic extends Component  {
  state={
    toHome : false,
    type: 'password',
    email:'',
    password:''
  }
    async submit (event){
      event.preventDefault();
      console.log(this.state.email)
      console.log(this.state.password)
      try{

        const user = await axios({
            method: "post",
            url: "http://localhost:3000/login" ,
            data: {
              email : this.state.email,
              password : this.state.password
            }
          })
          console.log('HAHAHAHAHAHA',user.data)
          if (user.data.data!=='You need to verify the email that is used in registeration'){
            alert("Successfully")  
            localStorage.setItem('jwtToken',user.data.data)
            axios.defaults.headers.common['Authorization'] = user.data.data
            const tok = localStorage.getItem('jwtToken').replace('Bearer ','')
            const decoded = jwt.decode(tok)
            alert(axios.defaults.headers.common['Authorization'])
            this.setState({toHome: true})
          }else{
            alert("You need to verify your mail") 
          }
         
        //setAuthToken(user.data.data)
        
        }
        catch(error)
        {
          alert(error)
        }
    }

    handleClick = () => this.setState(({type}) => ({
      type: type === 'text' ? 'password' : 'text'
    }))

    render(){
      if (this.state.toHome===true){
        return (<Redirect to={{pathname:'/LawyerHome'}} />)
        }else{
    return (
      <React.Fragment>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css"/>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
        <Row style={{height: .12*window.innerHeight + 'px'}}>  </Row>
        <legend  class="the-legend" style={{color: "#428bca"}}>Sign in</legend>        
        <Col md={{ span: 2, offset: 2 }}>
        <Row style={{height: .05*window.innerHeight + 'px'}} />
         <img src={image1} /> </Col>
        <Col md={{ span: 4, offset: 1 }}>
        <Row style={{height: .05*window.innerHeight + 'px'}} />
        <InputGroup className="mb-3">
        <Form.Label style={{color: "#428bca"}}>Email address</Form.Label>
        <FormControl type="mail" placeholder="mail@example.com" 
        onChange={(e) => {this.setState({email:e.target.value})}} required/>
      </InputGroup>
      <InputGroup className="mb-3">
        <Form.Label style={{color: "#428bca"}}>Password</Form.Label>
        <FormControl type={this.state.type} placeholder="Password" 
        onChange={(e) => {this.setState({password:e.target.value})}} required />
        <InputGroup.Append>
          <Button className="glyphicon glyphicon-eye-open" variant="outline" onClick={this.handleClick} />
        </InputGroup.Append>
      </InputGroup>
      <Col md={{ span: 10, offset: 6 }}>
      <Card.Link href="http://localhost:3001/ForgetPassword" style={{textDecoration: 'underline'}} >Forgotten Password ?</Card.Link></Col>
      <Row style={{height: .04*window.innerHeight + 'px'}}>  </Row>
      <Col md={{ span: 4, offset: 8 }}>
      <Button variant="primary" type="submit" onClick={this.submit.bind(this)}>Sign in</Button></Col>
      </Col>
      </React.Fragment>        
  )
  
    }
  }
}






export default signinArabic;