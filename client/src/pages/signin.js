import React ,{ Component } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'; 
import jwt from 'jsonwebtoken'
import axios from 'axios';
import { Route, Redirect } from 'react-router-dom'
import setAuthToken from '../helpers/setAuthToken';
const padding = {margin: '20'};
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
          if (user){
            alert("Successfully")  
          }
        //setAuthToken(user.data.data)
        localStorage.setItem('jwtToken',user.data.data)
        axios.defaults.headers.common['Authorization'] = user.data.data
        const tok = localStorage.getItem('jwtToken').replace('Bearer ','')
        const decoded = jwt.decode(tok)
        alert(axios.defaults.headers.common['Authorization'])
        this.setState({toHome: true})
        

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
  <Form.Group controlId="formBasicEmail">
    <Form.Label className="label label-primary">Email</Form.Label>
    <Form.Control type="email" placeholder="Enter email"  id="email"/>
    <Form.Text className="text-muted">
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label className="label label-primary">Password</Form.Label>
    <Form.Control type="password" placeholder="Password"  id="password"/>
  </Form.Group>
  <Button variant="primary" type="submit" onClick={this.submit.bind(this)}>
    Submit
  </Button>
</Form>
</React.Fragment>        
  )
  
    }
  }
}






export default signin;