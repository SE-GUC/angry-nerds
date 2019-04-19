import React, { Component } from "react";
import axios from 'axios'
import {
  Card,
  Button,
  CardHeader,
  CardFooter,
  CardBody,
  Row,
  Col,
  CardTitle,
  CardText
} from "reactstrap";
import { IconContext} from "react-icons";
import {IoIosPerson} from 'react-icons/io'
import Modal from 'react-bootstrap/Modal'

export class AdminDeleteInvestorItem extends Component {
  state = {
    disabled: true, 
    show: false

  }
change(){
  this.setState({
    show: true
  })
}
handleClose(){
  this.setState({
    show: false,
    disabled: true, 
  })
}

    async submit(event){
        await axios({
            method: 'delete',
            url:'http://127.0.0.1:3000/AdminDeleteInvestor/'+this.props.inv._id,
            headers: {}, 
            data: { 
            }
          });
          this.setState({
            show:false
          })
          alert('Successfully')
          window.location.replace('/AdminDeleteInvestor')

          
        
    }
    changeC(event)
    {
      if(document.getElementById("InvestorName").value===this.props.inv.firstName)
      {
        this.setState({
          disabled:false
        })
      }
      else{
        this.setState({
          disabled:true
        })
      }
    }
  render() {
    return (
      <div class="w-70">
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css"
        />

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js" />

        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js" />

        <Card body outline color="primary"  className="rounded-200">
          <CardHeader>
            <IconContext.Provider
              value={{ color: "#286090", className: "global-class-name", size:"3em" }}>
              <div>
                <IoIosPerson />
              </div>
            </IconContext.Provider>
            {this.props.inv.firstName + " " + this.props.inv.LastName}
          </CardHeader>
          <CardBody>
            <Row>
              <Col float="left">
                <CardTitle>
                  Nationality: {this.props.inv.Nationality}
                  <br />
                  {this.props.inv._id}
                </CardTitle>
              </Col>
              <Col float="right">
                <Button color="danger" float="right" onClick= {this.change.bind(this)}>
                  Delete Investor
                </Button>
              </Col>
            </Row>
          </CardBody>

          <br />
          <br />
        </Card>
        <Modal show={this.state.show} onHide={this.handleClose.bind(this)}  style={{backgroundColor: "white"}}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm delete investor</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4> Enter the investor's first name to confirm deletion</h4>
            <input class="form-control" type="input" placeholder= {this.props.inv.firstName}  onChange={this.changeC.bind(this)} id="InvestorName"/>
            <br></br>
            <Button color="danger" float="right" id="deleted" disabled={this.state.disabled} onClick={this.submit.bind(this)}>
                  Delete Investor
                </Button>
          </Modal.Body>
        </Modal>
      </div>

    );
  }
}

export default AdminDeleteInvestorItem;