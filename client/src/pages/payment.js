import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap';

export class payment extends Component {
    render() {
        const Case = this.props.case;
        const fees = Case.fees;
        console.log(Case);
        return (
            <div>
                <Card>
                    <CardBody>
                        <CardTitle >Card title</CardTitle>
                        <CardSubtitle>Card subtitle</CardSubtitle>
                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                        <Button color="primary">Button</Button>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default payment;
