import React ,{ Component } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'; 
import jwt from 'jsonwebtoken'
import axios from 'axios';
import { Row } from 'react-bootstrap';
import '../App.css'
import { Route, Redirect } from 'react-router-dom'
import setAuthToken from '../helpers/setAuthToken';
const padding = {margin: '20'};
const image1 =require('../Images/logo.png')

class signin extends Component  {
  state={
    toHome : false
  }
    async submit (event){
      event.preventDefault();
      var semail = document.getElementById("email").value
      var spassword = document.getElementById("password").value
      console.log(semail)
      console.log(spassword)
      try{

        const user = await axios({
            method: "post",
            url: "http://localhost:3000/login" ,
            data: {
              email : semail,
              password : spassword
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
    render(){
      if (this.state.toHome===true){
        return (<Redirect to={{pathname:'/LawyerHome'}} />)
        }else{
    return (
        <React.Fragment>
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
<h4>  <label className="label label-primary" for="ex2">Email</label> </h4>
</Row>
  <Form.Group controlId="formBasicEmail">
    <input class="form-control" type="email" placeholder="Enter email"  id="email"/>
  </Form.Group>
  </div>
  </Row>
  <Row>
  <h4><label className="label label-primary" for="ex2">Password</label></h4>
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
  )
  
    }
  }
}






export default signin;