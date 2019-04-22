import React, { Component } from 'react'
import {Form, Button,ButtonGroup,FormControl,Col} from 'react-bootstrap'
import axios from 'axios'


  const border ={
    border: 'dbdbdb'
    //  solid 1px,
    
  }
  const field ={
    width: 300
  }

  const form ={
    left:1100
  }

class SignUp extends Component {



  


state={
  firstName : '',
  MiddleName : '',
  LastName : '',
  email : '',
  password :'',
  ID_type : '',
  SSID : '',
  Nationality : '',
  Type : '',
  Address :'',
  birthdate : '',
  telephone_number : '',
  gender : ''
}



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
    console.log('my first name is ' + this.state.MiddleName)
    console.log('my first name is ' + this.state.LastName)
    console.log('my first name is ' + this.state.email)
    console.log('my first name is ' + this.state.ID_type)
    console.log('my first name is ' + this.state.SSID)
    console.log('my first name is ' + this.state.Nationality)
    console.log('my first name is ' + this.state.Type)
    console.log('my first name is ' + this.state.Address)
    console.log('my first name is ' + this.state.birthdate)
    console.log('my first name is ' + this.state.telephone_number)
    console.log('my first name is ' + this.state.gender)

    
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

  render() {
    return (
      <Col md={{ span: 0, offset: 3 }}>
      
      <Col md={{ span: 0, offset: 3 }}> 
  
        <Form  > 


      <h1>WELCOME </h1>

            <br></br>

        <Form.Group controlId="firstName" bg={field} variant="dark" style ={field}>
          <Form.Label>First Name</Form.Label>
          <Form.Control type="firstName"  placeholder="Enter your first name" name ="firstName" onChange = {this.handleChange.bind(this)}/> 
        </Form.Group>

        <Form.Group controlId="MiddleName"  bg={field} variant="dark" style ={field}>
          <Form.Label>Middle Name</Form.Label>
          <Form.Control type="MiddleName"  placeholder="Enter your middle name " name="MiddleName"  onChange = {this.handleChange.bind(this)}/>
        </Form.Group>

        <Form.Group controlId="LastName"  bg={field} variant="dark" style ={field}>
          <Form.Label>LastName Name</Form.Label>
          <Form.Control type="LastName" placeholder="Enter your last name" name="LastName"  onChange = {this.handleChange.bind(this)}/>
        </Form.Group>

        <Form.Group controlId="email"  bg={field} variant="dark" style ={field}>
          <Form.Label>E-mail</Form.Label>
          <Form.Control type="email" placeholder="Enter your email" name ="email"  onChange = {this.handleChange.bind(this)} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        {/* <InputGroup className="mb-3" controlId="email">
        <FormControl
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </InputGroup> */}



     
        <Form.Group controlId="password"  bg={field} variant="dark" style ={field}>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter your password" name="password" onChange = {this.handleChange.bind(this)}/>
        </Form.Group>
        <Form.Group controlId="formBasicChecbox">
          <Form.Check type="checkbox" label="Check me out"  onClick={this.myFunction.bind(this)}/>
        </Form.Group>


        <Form.Group controlId="SSID"  bg={field} variant="dark" style ={field}>
          <Form.Label>SSID</Form.Label>
          <Form.Control type="SSID" placeholder="Enter your social security number" name="SSID" onChange = {this.handleChange.bind(this)}/>
        </Form.Group>

        <Form.Group controlId="Nationality"  bg={field} variant="dark" style ={field}>
          <Form.Label>Nationality</Form.Label>
          <Form.Control type="Nationality" placeholder="Enter your nationality" name="Nationality" onChange = {this.handleChange.bind(this)}/>
        </Form.Group>

        <Form.Group controlId="Type"  bg={field} variant="dark" style ={field}>
          <Form.Label>ID-Type</Form.Label> <br/> 
<input type="radio" name="Type" value="Passport"  onChange={this.handleChange.bind(this)}/> Passport &nbsp;
<input type="radio" name="Type" value="National ID"   onChange={this.handleChange.bind(this)}/> National ID<br></br>
</Form.Group>


        {/* <Form.Group controlId="Type">
          <Form.Label>ID-Type</Form.Label>
          <Form.Control type="Type" placeholder="Enter your ID-Type" name="Type"  onChange = {this.handleChange.bind(this)}/>
        </Form.Group> */}

        <Form.Group controlId="Address"  bg={field} variant="dark" style ={field}>
          <Form.Label>Address</Form.Label>
          <Form.Control type="Address" placeholder="Enter your address" name="Address"  onChange = {this.handleChange.bind(this)}/>
        </Form.Group>

        <Form.Group controlId="birthdate"  bg={field} variant="dark" style ={field}>
          <Form.Label>Birth Date</Form.Label>
          <Form.Control type="birthdate" placeholder="Enter your birth date" name="birthdate"  onChange = {this.handleChange.bind(this)}/>
        </Form.Group>


        <Form.Group controlId="telephone_number"  bg={field} variant="dark" style ={field}>
          <Form.Label>Telephone Number</Form.Label>
          <Form.Control type="telephone_number" placeholder="Enter your number" name="telephone_number" onChange = {this.handleChange.bind(this)}/>
        </Form.Group>

        {/* <Form.Group controlId="gender">
          <Form.Label>Gender</Form.Label>
          <Form.Control type="gender" placeholder="Enter your gender" name="gender" onChange = {this.handleChange.bind(this)}/>
        </Form.Group> */}



          {/* <label>
            <input
              type="radio"
              value="male"
              // onClick={this.state.gender === "male"}
              onChange={this.handleChange.bind(this)}
            />
            Male
          </label>
      
       
          <label>
            <input
              type="radio"
              value="female"
              // onClick={this.state.gender === "female"}
              onChange={this.handleChange.bind(this)}
            />
            Female
          </label>
       */}

{/* 
<ButtonGroup>
    <Button active>Radio 1</Button>
    <Button>Radio 2</Button>
  </ButtonGroup> */}

 <Form.Group controlId="gender"  bg={field} variant="dark" style ={field}>
          <Form.Label>Gender</Form.Label> <br/> 
<input type="radio" name="gender" value="male"  onChange={this.handleChange.bind(this)}/> Male &nbsp;
<input type="radio" name="gender" value="female"   onChange={this.handleChange.bind(this)}/> Female<br></br>
</Form.Group>
<br/><br/>


      
        <Button variant="primary" type="submit" onClick ={this.OnClick1.bind(this)}>
          Submit
        </Button>
      </Form>
      
      </Col>
      </Col>
    )
  }
}

export default SignUp
