import React, { Component } from 'react'
import {Button,Form,Col} from 'react-bootstrap';
// import { Button,Row,Form,Col,Label,Input,FormGroup ,FormFeedback,FormText} from 'reactstrap';
 import './AddLawyer.css'
import axios from 'axios';



export class AddLawyer extends Component {

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
    total_time_on_cases: '0',
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
      Nationality: this.state.Nationality,
      birthdate: this.state.birthdate,
      Address: this.state.Address,
      telephone_number: this.state.telephone_number,
      fax: this.state.fax,
      completed_number_of_cases: '0',
      total_time_on_cases: '0',
      ssid: this.state.ssid,



     };

     try {
    axios.post(`http://localhost:3000/api/lawyer`,  user )
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
      <Form.Control type="email" name="email" placeholder="Enter email"  onChange={this.handleChangeEmail}/>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="text"  name="password" placeholder="Password"  onChange={this.handleChangePassword}/>
    </Form.Group>
  </Form.Row>

       <Form.Row>
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>First Name</Form.Label>
      <Form.Control type="text"  name="FName"   placeholder="Enter First Name"  onChange={this.handleChangeFName}/>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>Middle Name</Form.Label>
      <Form.Control type="text"  name="MName" placeholder="Enter Middle Name"  onChange={this.handleChangeMName}/>
    </Form.Group>

       <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>Last Name</Form.Label>
      <Form.Control type="text" name="LName" placeholder="Enter Last Name"  onChange={this.handleChangeLName}/>
    </Form.Group>

  </Form.Row>

  <Form.Row> 

  <Form.Group as ={Col} controlId="formGridAddress1">
    <Form.Label>Address</Form.Label>
    <Form.Control  name="Address"  onChange={this.handleChangegAddress} />
  </Form.Group>

  <Form.Group as={Col} controlId="formGridAddress1">
    <Form.Label>Phone Number</Form.Label>
    <Form.Control name="telephone_number" onChange={this.telephone_number} />
  </Form.Group>
  </Form.Row>

  <Form.Row>
    <Form.Group as={Col} controlId="formGridCity">
      <Form.Label>Nationality</Form.Label>
      <Form.Control name="Nationality" onChange={this.handleChangrNationality} />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridState">
      <Form.Label>Gender</Form.Label>
      <Form.Control as="select"  name="Gender" onChange={this.handleChangeGender}   >
        <option>...</option>
        <option>Female</option>
        <option>Male</option>

      </Form.Control>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridZip">
      <Form.Label>BithDate</Form.Label>
      <Form.Control type = "date"  name="BithDate" onChange={this.handleChangebirthdate}/>
    </Form.Group>
  </Form.Row>

     <Form.Row>

<Form.Group as={Col} controlId="formGridZip">
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
  


export default AddLawyer
