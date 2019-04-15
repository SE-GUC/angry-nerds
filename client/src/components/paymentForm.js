import axios from "axios";
import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Card, CardBody, CardTitle, CardSubtitle,
  CardText, 
 } from "reactstrap";
 const img = require('../Images/payment.png')

export class paymentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      creditNumber: "",
      month: "",
      year: "",
      cvc: ""
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.creditNumber);
    console.log(this.state.month);
    console.log(this.state.year);
    console.log(this.state.cvc);
    console.log(this.props.case._id);


    try {
      axios({
        method: "post",
        baseURL: "http://localhost:3000/InvestorPayFees",
        headers: {},
        data: { //body
          creditNumber: this.state.creditNumber,
          month: this.state.month,
          cvc: this.state.cvc,
          year: this.state.year,
          caseID: this.props.case._id
        }
      }).then(res => {
        return console.log(res);
      });
    } catch (e) {
      return console.log(e);
    }

      // axios.get('http://localhost:3000/api/investor').then(res => console.log(res))
}

  handleChange(event) {
    console.log(event.target.name);
    console.log(event.target.value);
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const { creditNumber } = this.state.creditNumber;
    const { month } = this.state.month;
    const { year } = this.state.year;
    const { cvc } = this.state.cvc;

    return (
      <div>
        <br></br>
        <br></br>
      
      <Card
      body
      inverse
      style={{ backgroundColor: "#444", borderColor: "#444" }}
    >
      <CardBody>
        <CardTitle>Establishment Fees</CardTitle>
        <CardSubtitle>Fees due</CardSubtitle>
        <CardText>
          Amount due is {this.props.fees}. You can pay securely via stripe.
        </CardText>
        <Button color="primary">Stripe</Button>
      </CardBody>
    </Card>
      
      
      
      
      <Form onSubmit={this.handleSubmit.bind(this)}>




        <FormGroup>
          <Label for="creditNumber">Credit Card Number</Label>
          <Input
            type="text"
            size="35"
            name="creditNumber"
            id="creditNumber"
            placeholder="credit card number"
            onChange={this.handleChange.bind(this)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="month">month</Label>
          <Input
            type="text"
            size="15"
            name="month"
            id="month"
            placeholder="expiry month"
            onChange={this.handleChange.bind(this)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="year">year</Label>
          <Input
            type="text"
            size="15"
            name="year"
            id="year"
            placeholder="expriy year"
            onChange={this.handleChange.bind(this)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="cvc">CVC</Label>
          <Input
            type="text"
            size="20"
            name="cvc"
            id="cvc"
            placeholder="cvc..."
            onChange={this.handleChange.bind(this)}
          />
        </FormGroup>
        <Button>Pay now</Button>
      </Form>
      </div>
    );
  }
}

const formStyle = {
  size: "50"
};

export default paymentForm;
