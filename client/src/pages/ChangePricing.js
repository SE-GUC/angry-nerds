import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'

import axios from 'axios'

export class ChangePricing extends Component {

    state = {
        validated: false,
        ////
        LawNumber: '',
        LawEntity: '',
        LawValue: '',
        LawCalc: '',
        min: '',
        max: '',
        description: ''
    }

    handleChangeLawNumber = event => {
        console.log(event.target.value)
        this.setState({ LawNumber: event.target.value});                                
      }
    
      handleChangeLawEntity = event => {
        this.setState({ LawEntity: event.target.value});                                
      }
      handleChangeLawValue = event => {
        this.setState({ LawValue: event.target.value});                                
      }
      handleChangeLawCalc = event => {
        this.setState({ LawCalc: event.target.value});                                
      }
      handleChangemin = event => {
        this.setState({ min: event.target.value});                                
      }
      handleChangemax= event => {
        this.setState({ max: event.target.value});                                
      }
      handleChangedescription= event => {
        this.setState({ description: event.target.value});                               
      } 


    handleSubmit(event) {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
          event.stopPropagation();
        }
        this.setState({ validated: true });
        const body = {
            LawNumber: this.state.LawNumber,
            LawEntity: this.state.LawEntity,
            LawValue: this.state.LawValue,
            LawCalc: this.state.LawCalc,
            min: this.state.min,
            max: this.state.max,
            description: this.state.description
        }
        axios.post('http://localhost:3000/AdminCreateNewLaw',body)
        .then( res => console.log(res))
      }


  render() {
    const { validated } = this.state;
    return (
        
        <div className="p-3">

        <h1> Change Pricing Laws </h1>
        <Form noValidate
        validated={validated}
        onSubmit={e => this.handleSubmit(e)}
        >
        <Form.Row>
          <Form.Group  as={Col} md="0.3" controlId="LawNumber">
            <Form.Label>Law Number</Form.Label>
            <Form.Control required
            onChange={this.handleChangeLawNumber}/>
            <Form.Control.Feedback type="invalid">
                Please enter the law number.
              </Form.Control.Feedback>
          </Form.Group>
      
          <Form.Group  as={Col}  controlId="LawEntity">
            <Form.Label>Entity </Form.Label>
            <Form.Control required
            onChange={this.handleChangeLawEntity}/>
            <Form.Control.Feedback type="invalid">
                Please enter the Entity name.
              </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>

        <Form.Row>
        <Form.Group as={Col} controlId="LawValue">
          <Form.Label>Value</Form.Label>
          <Form.Control required
          onChange={this.handleChangeLawValue}/>
          <Form.Control.Feedback type="invalid">
                Please enter the Value.
              </Form.Control.Feedback>
        </Form.Group>
      
        <Form.Group  as={Col} controlId="LawCalc">
          <Form.Label>Percentage from Capital</Form.Label>
          <InputGroup>


          <Form.Control type="text" aria-describedby="inputGroupAppend" required
           onChange={this.handleChangeLawCalc}/>
          <Form.Control.Feedback type="invalid">
                Please enter the Percentage.
              </Form.Control.Feedback>

              <InputGroup.Append>
                <InputGroup.Text id="inputGroupAppend">%</InputGroup.Text>
              </InputGroup.Append>    
          </InputGroup>

        </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="min">
            <Form.Label>Minimum</Form.Label>
            <Form.Control required
            onChange={this.handleChangemin}/>
            <Form.Control.Feedback type="invalid">
                Please enter the Minimum.
              </Form.Control.Feedback>
          </Form.Group>
      
          <Form.Group as={Col} controlId="max">
            <Form.Label>Maximum</Form.Label>
            <Form.Control required
            onChange={this.handleChangemax}/>
            <Form.Control.Feedback type="invalid">
                Please enter the Maximum.
              </Form.Control.Feedback>

          </Form.Group>
      
          
        </Form.Row>
      
        <Form.Row>
          <Form.Group as={Col} controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" onChange={this.handleChangedescription}/>

          </Form.Group>
    
        </Form.Row>
      
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      </div>

    )
  }
}

export default ChangePricing

