import React ,{ Component } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'; 
import Alert from 'react-bootstrap/Alert'; 
import axios from 'axios';
const padding = {margin: '20'};
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






export default signin;