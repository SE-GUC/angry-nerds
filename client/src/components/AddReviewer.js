import React, { Component } from 'react'
import {Button,Form,Col} from 'react-bootstrap';
// import { Button,Row,Form,Col,Label,Input,FormGroup ,FormFeedback,FormText} from 'reactstrap';
// import './AddLawyer.css'
import axios from 'axios';



export class AddReviewer extends Component {

  setstate = {
    FName: '',
    MName: '',
    LName: '',
    email: '',
    password: '',
    gender: '',
    Nationality: '',
    birthdate: '',
    Address: '',
    telephone_number: '',
    completed_number_of_cases :'0',
    number_of_cases: '0' ,
    total_time_on_cases: '0' ,
    fax: '',
    ssid:''
  }

  handleChangeFName = event => {
    this.setState({ FName: event.target.value});                                
  }

  handleChangeMName = event => {
    this.setState({ MName: event.target.value});                                
  }
  handleChangeLName = event => {
    this.setState({ LName: event.target.value});                                
  }

  handleChangeEmail = event => {
    this.setState({ email: event.target.value});                                
  }
  handleChangePassword = event => {
    this.setState({ password: event.target.value});                                
  }

  handleChangeGender = event => {
    this.setState({ gender: event.target.value});                                
  }
  handleChangrNationality = event => {
    this.setState({ Nationality: event.target.value});                                
  }
  handleChangebirthdate = event => {
    this.setState({ birthdate: event.target.value});                                
  }

  handleChangegAddress = event => {
    this.setState({ Address: event.target.value});                                
  }
  handleChangegtelephone_number = event => {
    this.setState({ telephone_number: event.target.value});                                
  }

  handleChangegfax = event => {
    this.setState({ fax: event.target.value});                                
  }

  handleChangegssid = event => {
    this.setState({ ssid: event.target.value});                                
  }

  handleSubmit = event => {
    event.preventDefault();

    const user = {
      FName: this.state.FName,
      MName: this.state.MName,
      LName: this.state.LName,
      email: this.state.email,
      password: this.state.password,
      gender: this.state.gender,
      Nationality: this.state.Nationality,      /// //`https://jsonplaceholder.typicode.com/users`
      birthdate: this.state.birthdate,
      Address: this.state.Address,
     telephone_number: this.state.telephone_number,
     fax:this.state.fax,
     completed_number_of_cases: '0',
     number_of_cases: '0',
     total_time_on_cases :"0",
     ssid: this.state.ssid,

     
     };

     
     try {
      axios.post(`http://localhost:3000/api/reviewer`,  user )
        .then(res => {
          console.log(res);
          console.log(res.data);
        }) }
        catch(e){
          console.log(e)
        }

  }

  
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>

      <Form.Row>
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>Email</Form.Label>
      <Form.Control type="email" placeholder="Enter email"  onChange={this.handleChangeEmail}/>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="text" placeholder="Password"  onChange={this.handleChangePassword}/>
    </Form.Group>
  </Form.Row>

       <Form.Row>
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>First Name</Form.Label>
      <Form.Control type="text" placeholder="Enter First Name"  onChange={this.handleChangeFName}/>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>Middle Name</Form.Label>
      <Form.Control type="text" placeholder="Enter Middle Name"  onChange={this.handleChangeMName}/>
    </Form.Group>

       <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>Last Name</Form.Label>
      <Form.Control type="text" placeholder="Enter Last Name"  onChange={this.handleChangeLName}/>
    </Form.Group>

  </Form.Row>

  <Form.Row> 

  <Form.Group as ={Col} controlId="formGridAddress1">
    <Form.Label>Address</Form.Label>
    <Form.Control  onChange={this.handleChangegAddress} />
  </Form.Group>

  <Form.Group as={Col} controlId="formGridAddress1">
    <Form.Label>Phone Number</Form.Label>
    <Form.Control  onChange={this.handleChangegtelephone_number} />
  </Form.Group>
  </Form.Row>

  <Form.Row>
    <Form.Group as={Col} controlId="formGridCity">
      <Form.Label>Nationality</Form.Label>
      <Form.Control  onChange={this.handleChangrNationality} />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridState">
      <Form.Label>Gender</Form.Label>
      <Form.Control as="select" onChange={this.handleChangeGender}   >
        <option>...</option>
        <option>Female</option>
        <option>Male</option>

      </Form.Control>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridZip">
      <Form.Label>BithDate</Form.Label>
      <Form.Control type = "date"  onChange={this.handleChangebirthdate}/>
    </Form.Group>
  </Form.Row>

   <Form.Row>

<Form.Group as ={Col}controlId="formGridZip">
<Form.Label>fax</Form.Label>
<Form.Control type = "text"  name="fax" onChange={this.handleChangegfax}/>
</Form.Group>

<Form.Group as ={Col} controlId="formGridZip">
<Form.Label>ssid</Form.Label>
<Form.Control type = "text"  name="fax" onChange={this.handleChangegssid}/>
</Form.Group>

</Form.Row>


  <Button variant="primary" type="submit">
    Submit
  </Button>
      </Form>
    );
  }
}
  


export default AddReviewer
