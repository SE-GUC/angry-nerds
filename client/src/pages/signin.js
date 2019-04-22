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
const style = { backgroundImage:" url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAxMC8yOS8xMiKqq3kAAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzVxteM2AAABHklEQVRIib2Vyw6EIAxFW5idr///Qx9sfG3pLEyJ3tAwi5EmBqRo7vHawiEEERHS6x7MTMxMVv6+z3tPMUYSkfTM/R0fEaG2bbMv+Gc4nZzn+dN4HAcREa3r+hi3bcuu68jLskhVIlW073tWaYlQ9+F9IpqmSfq+fwskhdO/AwmUTJXrOuaRQNeRkOd5lq7rXmS5InmERKoER/QMvUAPlZDHcZRhGN4CSeGY+aHMqgcks5RrHv/eeh455x5KrMq2yHQdibDO6ncG/KZWL7M8xDyS1/MIO0NJqdULLS81X6/X6aR0nqBSJcPeZnlZrzN477NKURn2Nus8sjzmEII0TfMiyxUuxphVWjpJkbx0btUnshRihVv70Bv8ItXq6Asoi/ZiCbU6YgAAAABJRU5ErkJggg=="}


class signin extends Component  {
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
<<<<<<< HEAD
        <React.Fragment >
     <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css"/>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
<Form>
<div> 
  <div style={{textAlign:"center"}}>
<img src={image1} class="rounded"/>
</div>
</div>
<br>
</br>
<fieldset class="the-fieldset">
   <legend  class="the-legend" >Sign in</legend>
<div className="container">
<Row >
<div className="col-xs-4">
<Row>
<h4>  <label className="label label-default" for="ex2">Email</label> </h4>
</Row>
  <Form.Group controlId="formBasicEmail">
    <input class="form-control" type="email" placeholder="Enter email"  id="email"/>
  </Form.Group>
  </div>
  </Row>
  <Row>
  <h4><label className="label label-default" for="ex2">Password</label></h4>
  </Row>
  <Row>
  <div className="col-xs-4">
  <Form.Group controlId="formBasicPassword">
    <input class="form-control" type="password" placeholder="Enter password"  id="password"/>

 
  </Form.Group>
  </div>
  </Row>
  <br></br>
  <Row>
  <Button variant="primary" type="submit" onClick={this.submit.bind(this)}>
    Sign in
  </Button>
  </Row>
  </div>
  </fieldset>
</Form>
</React.Fragment>        
=======
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
>>>>>>> react_dev
  )
  
    }
  }
}






export default signin;