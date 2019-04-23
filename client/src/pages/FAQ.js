import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import CollapseGeneral from '../components/collapseGeneral'
import CollapseCompanies from '../components/collapseCompanies'

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  askQuestion(event){
      window.location.replace('/Questions')
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    return (
      <div id="flex-container">
      <center>
      <div class="flex-item">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              General
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Companies
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <CollapseGeneral/>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="6">
                <CollapseCompanies/>
              </Col>
              <Col sm="6">
                
              </Col>
            </Row>
          </TabPane>
        </TabContent>
        </div>
        <div class="flex-item">
        <br>
        </br>
        <br></br>
        <br>
        </br>
        <br></br>
        <Button color="primary" onClick={this.askQuestion.bind(this)} style={{ marginBottom: '1rem' }}><h6>Ask your own question</h6></Button>
        

        </div>
        </center>
      </div>
    );
  }
}