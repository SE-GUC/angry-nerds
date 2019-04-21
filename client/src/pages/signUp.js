import React, { Component } from 'react'
import {Form, Button} from 'react-bootstrap'
import axios from 'axios'

class SignUp extends Component {
  myFunction(event) {
    console.log('hiiii')
      var x = document.getElementById("password");
      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
      }
    } 
  

// async submit (event){
//     event.preventDefault
// }
OnClick1(event){
    console.log('here')
   event.preventDefault()  
    
try{  
    console.log('my first name is ' + this.state.firstName)
    
axios({
    method: 'post',
    url: 'http://localhost:3000/register',
    headers: {},
    data: {
        firstName : this.state.firstName,
        MiddleName : this.state.MiddleName,
        LastName : this.state.LastName,
        email : this.state.email,
        password : this.state.password,
        ID_type : this.state.ID_type,
        SSID : this.state.SSID,
        Nationality : this.state.Nationality,
        Type : this.state.Type,
        Address : this.state.Address,
        birthdate : this.state.birthdate,
        telephone_number : this.state.telephone_number,
        gender : this.state.gender

    }
  }).then(
  res => {alert(res)}
 )


} catch(error){
console.log(error)
}  

}
 
    constructor(props) {
      super(props);
    //   this.state = {
    //     startDate: new Date()
    //   };
       this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(event) {
        console.log(event.target.name)
       console.log(event.target.value)
      this.setState({
          
           [event.target.name] : event.target.value
      });
    }
   

    
   
      

     OnClick1(event){
            console.log('here')
           event.preventDefault()  
            
        try{  
            console.log('my first name is ' + this.state.firstName)
            
        axios({
            method: 'post',
            url: 'http://localhost:3000/api/Investor/register',
            headers: {},
            data: {
                firstName : this.state.firstName,
                MiddleName : this.state.MiddleName,
                LastName : this.state.LastName,
                email : this.state.email,
                password : this.state.password,
                ID_type : this.state.ID_type,
                SSID : this.state.SSID,
                Nationality : this.state.Nationality,
                Type : this.state.Type,
                Address : this.state.Address,
                birthdate : this.state.birthdate,
                telephone_number : this.state.telephone_number,
                gender : this.state.gender
        
            }
          }).then(
          res => {console.log(res)}
          
         )
        
        
        } catch(error){
        console.log(error)
        }  
        
 }
         


  render() {
    return (
        <Form>
<h1> <Form.Label className="label label-primary">WELCOME</Form.Label> </h1>
            <br></br>


        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="firstName" placeholder="Enter your first name" onChange = {this.handleChange.bind(this)}/> 
        </Form.Group>

        <Form.Group controlId="MiddleName">
          <Form.Label>Middle Name</Form.Label>
          <Form.Control type="MiddleName" placeholder="Enter your middle name " onChange = {this.handleChange.bind(this)}/>
        </Form.Group>

        <Form.Group controlId="LastName">
          <Form.Label>LastName Name</Form.Label>
          <Form.Control type="LastName" placeholder="Enter your last name" onChange = {this.handleChange.bind(this)}/>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>E-mail</Form.Label>
          <Form.Control type="email" placeholder="Enter your email" onChange = {this.handleChange.bind(this)} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

     
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter your password" onChange = {this.handleChange.bind(this)}/>
        </Form.Group>
        <Form.Group controlId="formBasicChecbox">
          <Form.Check type="checkbox" label="Check me out"  onClick={this.myFunction.bind(this)}/>
        </Form.Group>


        <Form.Group controlId="SSID">
          <Form.Label>SSID</Form.Label>
          <Form.Control type="SSID" placeholder="Enter your social security number" onChange = {this.handleChange.bind(this)}/>
        </Form.Group>

        <Form.Group controlId="Nationality">
          <Form.Label>Nationality</Form.Label>
          <Form.Control type="Nationality" placeholder="Enter your nationality" onChange = {this.handleChange.bind(this)}/>
        </Form.Group>

        <Form.Group controlId="Type">
          <Form.Label>ID-Type</Form.Label>
          <Form.Control type="Type" placeholder="Enter your ID-Type" onChange = {this.handleChange.bind(this)}/>
        </Form.Group>

        <Form.Group controlId="Address">
          <Form.Label>Address</Form.Label>
          <Form.Control type="Address" placeholder="Enter your address" onChange = {this.handleChange.bind(this)}/>
        </Form.Group>

        <Form.Group controlId="telephone_number">
          <Form.Label>Telephone Number</Form.Label>
          <Form.Control type="telephone_number" placeholder="Enter your number" onChange = {this.handleChange.bind(this)}/>
        </Form.Group>

        <Form.Group controlId="gender">
          <Form.Label>Gender</Form.Label>
          <Form.Control type="gender" placeholder="Enter your gender" onChange = {this.handleChange.bind(this)}/>
        </Form.Group>


      
        <Button variant="primary" type="submit" onClick ={this.OnClick1.bind(this)}>
          Submit
        </Button>
      </Form>
    )
  }
}

export default SignUp
