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
        <Button color="link" onClick={this.toggle} style={{ marginBottom: '1rem' }}><h4>اين موقعك؟</h4></Button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
            القاهرة ، تحقق من صفحة حول لدينا لمزيد من المعلومات
            </CardBody>
          </Card>
        </Collapse>
      </div>
      <div>
        <Button color="link" onClick={this.toggle1.bind(this)} style={{ marginBottom: '1rem' }}><h4>ماذا تفعل؟</h4></Button>
        <Collapse isOpen={this.state.collapse1}>
          <Card>
            <CardBody>
            <p>نحن نساعد في تأسيس الشركات من خلال هذا الموقع</p>
            </CardBody>
          </Card>
        </Collapse>
      </div>
      </div>
    );
  }
}

export default collapse;