import React, { Component } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';

class collapse extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  render() {
    return (
      <div>
        <Button color="Light" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Where is your location?</Button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
            Cairo
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
}

export default collapse;