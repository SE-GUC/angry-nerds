import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'

class CaseCard extends Component {

  render() {
    const now = new Date()
    const date = new Date(this.props.case.caseOpenSince)
    console.log(((now.getTime()-date.getTime())))
    const bg = ((now.getTime()-date.getTime())<1000*60*60*24*31)?'light':'danger'
    const text = ((now.getTime()-date.getTime())<1000*60*60*24*31)?'black':'white'

    return (
        <div class="p-1">
       <Card bg={bg} text={text} style={{ }}>
       <Card.Header>{this.props.case.english_name}</Card.Header>

        <Card.Body>

            <Card.Subtitle className="mb-2 ">{date.toDateString()}</Card.Subtitle>
            <Card.Text>
            {this.props.case.fees}$
            </Card.Text>
            <Button href="#">Open Case</Button>
        </Card.Body>
        </Card>
    </div>
    );
  }
}



export default CaseCard;
