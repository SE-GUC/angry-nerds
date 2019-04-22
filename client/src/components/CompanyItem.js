import React, { Component } from "react";
import {Card,Button,CardHeader,CardBody,ReactFragment,Row,Col,CardTitle} from "reactstrap";
import { IconContext} from "react-icons";
//import {IoIosHomeOutline} from 'react-icons/io'
export class CompanyItem extends Component {

  constructor(props){
    super(props)
  }

  state = {

  }
  render() {
    const bg = "light"
    const text = "black"
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
              </div>
            </IconContext.Provider>
            {this.props.company.english_name + " " + this.props.company.arabic_name}
          </CardHeader>
          <CardBody>
            <Row>
              <Col float="left">
                <CardTitle>
                  Form type: {this.props.company.form_type}
                  <br />
                  Case status: {this.props.company.caseStatus}
                  <br/>
                 Comapny id: {this.props.company._id}
                </CardTitle>
              </Col>
            </Row>
          </CardBody>
          </Card>
          </div>
 
    );
  }
}

export default CompanyItem;