import React, { Component } from "react";
<<<<<<< HEAD
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
    console.log(Case);
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
=======
import { Card, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap';

export class payment extends Component {
    render() {
        const Case = this.props.case;
        console.log(Case);
        return (
            <div>
                <Card>
                    <CardBody>
                        <CardTitle >Card title</CardTitle>
                        <CardSubtitle>Card subtitle</CardSubtitle>
                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                        <Button color="primary">Button</Button>
                    </CardBody>
                </Card>
            </div>
        );
    }
>>>>>>> d8595f835669df5b09e66bc472d79a30061f4a0f
}

export default payment;
