import React ,{ Component } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'; 
import Alert from 'react-bootstrap/Alert'; 
import axios from 'axios';
class signin extends Component  {
    async submit (event){
        event.preventDefault();
        var semail = document.getElementById("email").value
        var spassword = document.getElementById("password").value
        try{
        await axios.get( 'http://localhost:3000/InvestorSignIn/'+semail+'/'+spassword)
        //document.getElementById("email").value = 'Successfully'
        alert("Successfully")
        //document.getElementById("status").value = 'Successfully'
         // document.getElementById("status").variant = 'success'
        }
        catch(error)
        {
         // document.getElementById("email").value = 'Incorrect email or password'
          alert("Incorrect email or password")
          //document.getElementById("status").value = 'Incorrect email or password'
         // document.getElementById("status").variant = 'danger'
        }
        //console.log(company)
    }
    render(){
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






export default signin;