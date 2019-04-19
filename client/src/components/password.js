import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Button"; 
import Button from "react-bootstrap/Button";

class Verifypassword extends Component {
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

    render(){
        return(
            <input class="form-control" placeholder="Enter your new password" onChange={this.validate.bind(this)}
                type="password" id="password" name="psw" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required></input>
                
        )
    }

}

export default Verifypassword;
