import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { IconContext } from "react-icons";
import {FaLock} from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import {FaLockOpen} from "react-icons/fa";

class InvestorItem extends Component {

  buttonSetter = (oneInvestor) => {
      return(
        <div>
        <Button href="#" className="float-right"
          style ={{backgroundColor:'#286090',border:'#286090'}}>
          View profile
        </Button>
        </div>

      )
    
  }


  render() {
    let now = new Date();
    let date = new Date(this.props.case.log[0].date);
    const bg = "light"
    const text = "black"
    // const iconColour =  now.getTime() - date.getTime() < 1000 * 60 * 60 * 24 * 3
    //     ? "black"
    //     : "red";    

    return (
      <div className="p-1">
      
        <Card bg={bg} text={text} style={{}}>
          <Card.Header>
          <div className="float-left">{this.props.case.english_name}</div>
          {this.iconSetter(this.props.case)}        
          </Card.Header>

          <Card.Body>
            <div className="ml-auto p-2 bd-highlight">
              <Card.Text className="float-left">
                Case ID: <samp>{this.props.case._id} </samp>
                <br />
                Capital: {this.props.case.equality_capital}$
                </Card.Text>
                {this.buttonSetter(this.props.case)}
            </div>
          </Card.Body>

          <Card.Footer>
            <small className="mb-2">
              {Math.floor(
                (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
              )}{" "}
              days ago{" "}
            </small>
          </Card.Footer>
        </Card>
      </div>
    );
  }
}

export default InvestorItem;