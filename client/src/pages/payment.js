import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";
import PaymentForm from '../components/paymentForm'


export class payment extends Component {

  state = {
      flag: false
  };

  render() {
    const Case = this.props.case;
    const fees = Case.fees;
    return (
      <div>
        <Card body inverse style={{ backgroundColor: '#444', borderColor: '#444' }}>
          <CardBody>
            <CardTitle>Establishment Fees</CardTitle>
            <CardSubtitle>Fees due</CardSubtitle>
            <CardText>
              Amount due is {fees}. You can pay securely via stripe.
            </CardText>
            <Button color="primary" >Stripe</Button>
          </CardBody>
        </Card>
        
        <PaymentForm case={this.props.case}/>
      </div>
    );
  }
}

export default payment;
