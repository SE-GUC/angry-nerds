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
import axios from 'axios'
import PaymentForm from "../components/paymentForm";

export class payment extends Component {
  state = {
    case: {}
  };

  constructor(props){
    super(props)

    this.state = {
      case: {},
      fees: '',
      invoice: ''
    }

    const id = this.props.match.params.id

    axios.get('http://localhost:3000/api/cases/' + id).then(res => {
      console.log('company =====>>>',res)
      this.setState({
        case: res.data.data
      })
    })

    axios.get('http://localhost:3000/calculateFees/' + id).then(res=>{
      console.log('fees =====>', res)
      this.setState({
        fees: res.data.fees,
        invoice: res.data.invoice

      })
    }).catch((e)=>
    console.log(e))
  }

  

  render() {
    return (
      <div>
       

        <PaymentForm case={this.state.case} fees= {this.state.fees} invoice={this.state.invoice}/>
      </div>
    );
  }
}

export default payment;
