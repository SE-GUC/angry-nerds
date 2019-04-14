import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'

import axios from 'axios'

export class ChangePricing extends Component {

  state = {
    validated: false,
    fieldType: "password",
    ////
    oldPassword: "",
    newPassword: "",
    lowerCase: false,
    upperCase: false,
    number: false,
    length1: false
  }

  handleChangeOldPassword = event => {
    this.setState({ oldPassword: event.target.value });
  }

  handleChangeNewPassword(event) {
    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g
    let p = document.getElementById('nPassword1').value
    if (p.length > 8 && p.length < 25) {
      console.log("i am length")
      this.setState({
        length1: true
      })
      console.log(this.state.length1)
    }
      if (upperCaseLetters.test(p)) {
        console.log("i am upperCase")
        this.setState({
          upperCase: true
        })
      }
      if (lowerCaseLetters.test(p)) {
        console.log("i am lowerCase")
        this.setState({
          lowerCase: true
        })
      }
      if (numbers.test(p)) {
        console.log("i am number")
        this.setState({
          number: true
        })
      }
  }

  showPassword(event) {
    if (this.state.fieldType === "password")
      this.setState({
        fieldType: "text"
      })
    else {
      this.setState({
        fieldType: "password"
      })
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    
    
    let p1 = document.getElementById('nPassword1').value
    let p2 = document.getElementById("nPassword2").value
    const form = event.currentTarget;
    
    

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    if (p2 !== p1) {
      alert("please enter the correct password")
    }

    else {
      this.setState({
        number: true
      })
      console.log(this.state.length1)
      console.log(this.state.number)
      console.log(this.state.upperCase)
      console.log(this.state.lowerCase)
      if (this.state.number && this.state.length1 && this.state.upperCase && this.state.lowerCase) {
        this.setState({ validated: true });
        const body = {
          oldPassword: this.state.oldPassword,
          newPassword: this.state.newPassword


        }
        axios.put('http://localhost:3000/InvestorChangePassword/5ca772654d70710fa843bd5f', body)
          .then(res => console.log(res))
          .catch(error => alert(error.response.data.error))

      }
      else {
        alert("Your password must contain a LOWERCASE letter, an UPPERCASE letter, a NUMBER with length 8-25 characters")
      }
    }
  }


  render() {
    const { validated } = this.state;
    return (
      <center>

        <div className="p-3">

          <h1> Change Password </h1>
          <Form noValidate
            validated={validated}
            onSubmit={e => this.handleSubmit(e)}
          >

            <Form.Group md="0.3" controlId="oPassword">
              <Form.Label>Old Password</Form.Label>
              <Form.Control required
                onChange={this.handleChangeOldPassword} />
              <Form.Control.Feedback type="invalid">
                Please enter your old password
              </Form.Control.Feedback>
            </Form.Group>


            <Form.Group controlId="nPassword1">
              <Form.Label >New Password </Form.Label>
              <Form.Control required
                onChange={this.handleChangeNewPassword.bind(this)} type={this.state.fieldType} />
              <Form.Control.Feedback type="invalid" >
                Please enter your new password
              </Form.Control.Feedback>
            </Form.Group>



            <Form.Group controlId="nPassword2">
              <Form.Label>Confirm new password</Form.Label>
              <Form.Control required
                onChange={this.handleChangeNewPassword1} type={this.state.fieldType} />
              <Form.Control.Feedback type="invalid">
                Please repeat new password
              </Form.Control.Feedback>
            </Form.Group>


            <Form.Group controlId="formBasicChecbox">
              <Form.Check type="checkbox" label="Show Password" onChange={this.showPassword.bind(this)} />
            </Form.Group>


            <Button variant="primary" type="submit"  onClick={this.handleSubmit.bind(this)}>
              Submit
        </Button>
          </Form>
        </div>
      </center>
    )
  }
}

export default ChangePricing