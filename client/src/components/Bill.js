import React, { Component  } from "react";
import ReactDOM from 'react-dom'
import {Button,InputGroup,FormControl,Row,Col,Card} from "react-bootstrap";
import axios from 'axios';
import { builtinModules } from "module";

class Bill extends Component {


state = {
    fees:'',
    details:[],

}

reMap(){  
  return ( this.state.details.map((x) => 
  ( <Card.Text >
    {x}
  </Card.Text>
  )))
}

submit(){
  try{
    axios({
       method: "get",
       url: 'http://localhost:3000/CalcFeesImmediately/'+this.props.regulatedLaw+'/'+this.props.capital ,
     }).then(
       res => {
         let str = res.data.invoice
         let invoice = str.split(",");
         this.setState({fees:res.data.fees})
         this.setState({details:invoice})
       }          
     )
   }
   catch(error)
   {
     alert(error)
   }
}

  render() {
    return (
        <Card style={{ width: '18rem' }} border="primary" >
        <Card.Header style={{ width: '18rem' }} as="h4" >Bill</Card.Header>
        <Card.Body>  
          {this.reMap()}
          <Card.Title as="h6">Total fees : {this.state.fees}</Card.Title>  
          <Button onClick={this.submit.bind(this)}>Calculate fees</Button>  
        </Card.Body>
      </Card>
    )
  }
}


export default Bill;
