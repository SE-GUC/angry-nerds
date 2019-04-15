import React, { Component } from "react";
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

export class InvestorItem extends Component {
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
                <Button color="primary" float="right">
                  View Investor Profile
                </Button>
              </Col>
            </Row>
          </CardBody>

          <br />
          <br />
        </Card>
      </div>
    );
  }
}

export default InvestorItem;