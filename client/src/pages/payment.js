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
    case:
    {
      _id: "5c95094155f85f30d82dcfeb",
      form_type: "SSCP",
      regulated_law: "masr",
      arabic_name: "تتتت",
      english_name: "Hello6",
      government: "ENG",
      city: "Cairo",
      hq_address: "gftfy",
      hq_city: "yes",
      main_center_phone: 123515,
      main_center_fax: 518563,
      currency: "541",
      equality_capital: 5054641641562,
      caseStatus: "pending",
      investorID: "5ca772654d70710fa843bd5f",
  }
  };

  render() {
    const Case = this.state.case;
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
        
        <PaymentForm case={this.state.case}/>
      </div>
    );
  }
}

export default payment;
