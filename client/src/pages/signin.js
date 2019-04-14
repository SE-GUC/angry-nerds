import React ,{ Component } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'; 
import jwt from 'jsonwebtoken'
import axios from 'axios';
import { Route, Redirect } from 'react-router-dom'
import setAuthToken from '../helpers/setAuthToken';
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
        //const x = await axios.get( 'http://localhost:3000/InvestorSignIn/'+semail+'/'+spassword)

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
        setAuthToken(user.data.data)
        localStorage.setItem('jwtToken',user.data.data)
        const tok = localStorage.getItem('jwtToken').replace('Bearer ','')
        const decoded = jwt.decode(tok)
        alert(axios.defaults.headers.common['Authorization'])
          this.setState({toHome: true})
        
        //document.getElementById("email").value = 'Successfully'
        //document.getElementById("status").value = 'Successfully'
         // document.getElementById("status").variant = 'success'
        }
        catch(error)
        {
         // document.getElementById("email").value = 'Incorrect email or password'
          alert(error)
          //document.getElementById("status").value = 'Incorrect email or password'
         // document.getElementById("status").variant = 'danger'
        }
        //console.log(company)
    }
    render(){
      if (this.state.toHome===true){
        return (<Redirect to={{pathname:'/LawyerHome'}} />)
        }else{
    return (
        <React.Fragment>
         
       <div className="App"/>
       <script src="https://unpkg.com/react/umd/react.production.js" crossorigin />

<script
  src="https://unpkg.com/react-dom/umd/react-dom.production.js"
  crossorigin
/>

<script
  src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
  crossorigin
/>

<script>var Alert = ReactBootstrap.Alert;</script>
<link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
  integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
  crossorigin="anonymous"
/>
<Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email</Form.Label>
    <Form.Control type="email" placeholder="Enter email"  id="email"/>
    <Form.Text className="text-muted">
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
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