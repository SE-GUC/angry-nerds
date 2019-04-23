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
import {IoMdClipboard} from 'react-icons/io'
import Modal from 'react-bootstrap/Modal'

export class DeleteFormTypeItem extends Component {
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
            url:'http://127.0.0.1:3000/AdminDeleteFormType/'+this.props.form._id,
            headers: {}, 
            data: { 
            }
          });
          this.setState({
            show:false
          })
          window.location.replace('/deleteFormType')

          
        
    }
    changeC(event)
    {
      if(document.getElementById("InvestorName").value===this.props.form.formName)
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
                <IoMdClipboard />
              </div>
            </IconContext.Provider>
            {this.props.form.formName}
          </CardHeader>
          <CardBody>
          <CardTitle>
                  Form Type: {this.props.form.formName}
                  <br />
                  {this.props.form._id}
                </CardTitle>
            <Row>
              
              <Col float="right">
                <Button color="danger" float="right" onClick= {this.change.bind(this)}>
                  Delete Form Type
                </Button>
              </Col>
            </Row>
          </CardBody>

          <br />
          <br />
        </Card>
        <Modal show={this.state.show} onHide={this.handleClose.bind(this)}  style={{backgroundColor: "white"}}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm delete Form Type</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4> Enter the form type to confirm deletion</h4>
            <input class="form-control" type="input" placeholder= {this.props.form.formName}  onChange={this.changeC.bind(this)} id="InvestorName"/>
            <br></br>
            <Button color="danger" float="right" id="deleted" disabled={this.state.disabled} onClick={this.submit.bind(this)}>
                  Delete form
                </Button>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
export default DeleteFormTypeItem;