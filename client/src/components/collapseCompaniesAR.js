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
        <Button color="link" onClick={this.toggle} style={{ marginBottom: '1rem' }}><h4>ما هي أنواع الشركات؟</h4></Button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
            SCP and SSC
            </CardBody>
          </Card>
        </Collapse>
      </div>
      <div>
        <Button color="link" onClick={this.toggle1.bind(this)} style={{ marginBottom: '1rem' }}><h4>كم يكلف تأسيس شركة؟</h4></Button>
        <Collapse isOpen={this.state.collapse1}>
          <Card>
            <CardBody>
            <p>رجى مراجعة صفحة القوانين والرسوم الخاصة بنا لمزيد من المعلومات</p>
            </CardBody>
          </Card>
        </Collapse>
      </div>
      </div>
    );
  }
}

export default collapse;