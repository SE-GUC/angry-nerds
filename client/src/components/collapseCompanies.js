import React, { Component } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';

class collapse extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { 
      collapse: false,
      collapse1: false
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }
  toggle1() {
    this.setState({ collapse1: !this.state.collapse1 });
  }

  render() {
    return (
      <div>
      <div>
        <Button color="link" onClick={this.toggle} style={{ marginBottom: '1rem' }}><h4>What are the types of companies?</h4></Button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
            SCP and SSC
            </CardBody>
          </Card>
        </Collapse>
      </div>
      <div>
        <Button color="link" onClick={this.toggle1.bind(this)} style={{ marginBottom: '1rem' }}><h4>How much does it cost to establish a company?</h4></Button>
        <Collapse isOpen={this.state.collapse1}>
          <Card>
            <CardBody>
            <p>Please check our laws and fees page for further information</p>
            </CardBody>
          </Card>
        </Collapse>
      </div>
      </div>
    );
  }
}

export default collapse;