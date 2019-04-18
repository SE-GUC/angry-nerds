import React ,{ Component } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'; 
import Alert from 'react-bootstrap/Alert'; 
import axios from 'axios';
import { Row , Col } from 'react-bootstrap';
import '../App.css'
import Verifypassword from "../components/password"
const padding = {margin: '20'};

class Resetpass extends Component  {
    state={
        lowerCase:"text-danger",
        upperCase:"text-danger",
        number:"text-danger",
        minimum:"text-danger",
    }

    validate(){
        var pass = document.getElementById("psw").value
        var lowerCaseLetters = /[a-z]/g;
        var upperCaseLetters = /[A-Z]/g;
        var numbers = /[0-9]/g;

        if (lowerCaseLetters.test(pass)){
            this.setState({lowerCase:"text-success"})            
        }else{
            this.setState({lowerCase:"text-danger"})            
        }

        if (upperCaseLetters.test(pass)){
            this.setState({upperCase:"text-success"})            
        }else{
            this.setState({upperCase:"text-danger"})            
        }

        if (numbers.test(pass)){
            this.setState({number:"text-success"})            
        }else{
            this.setState({number:"text-danger"})            
        }

        if (pass.length>=7){
             this.setState({minimum:"text-success"})            
        }else{
            this.setState({minimum:"text-danger"})
        }
        
    }
    same(){

    }

    async submit (event){
        event.preventDefault();
        var spassword = document.getElementById('password').value
        try{
        await axios.get('http://localhost:3000/changepassword/'+spassword)
        alert("Successfully")
        }
        catch(error)
        {
          alert("Incorrect password")
        }
    }
    render(){
    return (
        <React.Fragment>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css"/>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
        <Form>
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
                <input class="form-control" placeholder="Enter your new password" onChange={this.validate.bind(this)}
                type="password" id="password" name="psw" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required></input>
            </Form.Group>
            <Verifypassword />
            </div></Col>
            </Row>
            <Row>
            <Col  md={{ span: 4, offset: 4 }}>
            <div className="col-xs-12">
            <Form.Group controlId="formBasicPassword">
                <label className="label label-primary" for="ex2">Confirm new password</label>
                <input class="form-control" placeholder="Enter your new password" onChange={this.validate.bind(this)}
                type="password" id="psw1" name="psw1" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                onChange={this.validate.bind(this)} required></input> 
            </Form.Group>
            </div>
            </Col>
            </Row>
            <Row>
            <Col  md={{ span: 4, offset: 5 }}>
            <Button variant="primary" type="submit" onClick={this.submit.bind(this)}>
                Confirm
            </Button>
            </Col>
            </Row>
            <Col  md={{ span: 2, offset: 8 }}>
            <p className={this.state.lowerCase}>lowerCase</p>
            <p className={this.state.upperCase}>upperCase</p>
            <p className={this.state.minimum}>minLength</p>
            <p className={this.state.number}>numbers</p>
            </Col>
            </div>
            </fieldset>
    </Form>
    </React.Fragment>    
  )
  
}
}


export default Resetpass;