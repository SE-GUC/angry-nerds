import React ,{ Component } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'; 
import Alert from 'react-bootstrap/Alert'; 
import axios from 'axios';
import { Row , Col } from 'react-bootstrap';
import '../App.css'
const padding = {margin: '20'};

class signin extends Component  {
    async submit (event){
        event.preventDefault();
        var semail = document.getElementById("email").value
        var spassword = document.getElementById("password").value
        try{
        await axios.get( 'http://localhost:3000/InvestorSignIn/'+semail+'/'+spassword)
        alert("Successfully")
        }
        catch(error)
        {
          alert("Incorrect email or password")
        }
    }
    render(){
    return (
        <React.Fragment>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css"/>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
            <Form>
            <div>
            <div style={{textAlign:"center"}}>
            </div>
            </div>
            <br>
            </br>
            <fieldset class="the-fieldset">
            <legend  class="the-legend" >Reset Password</legend>
            <div className="container">
            <Row>
            <Col  md={{ span: 4, offset: 4 }}>
            <div className="col-xs-12">
            <Form.Group controlId="formBasicPassword">
                <label className="label label-primary" for="ex2">New password</label>
                <input class="form-control" type="password" placeholder="Enter your new password"  id="email"/>
            </Form.Group>
            </div></Col>
            </Row>
            <Row>
            <Col  md={{ span: 4, offset: 4 }}>
            <div className="col-xs-12">
            <Form.Group controlId="formBasicPassword">
                <label className="label label-primary" for="ex2">Confirm new password</label>
                <input class="form-control" type="password" placeholder="confirm password"  id="password"/> 
            </Form.Group>
            </div></Col>
            </Row>
            <Row>
            <Col  md={{ span: 4, offset: 5 }}>
            <Button variant="primary" type="submit" onClick={this.submit.bind(this)}>
                Confirm
            </Button>
            </Col>
            </Row>
            
            </div>
            </fieldset>
</Form>
</React.Fragment>

        
  )
  
    }
}






export default signin;