import React, { Component } from "react";
import axios from 'axios'
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from 'react-bootstrap/Table'
import { Collapse} from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import {  CardBody } from 'reactstrap';

const inag= require('../Images/enterprise.png')


class miniJournal extends Component {

        
        state={
            open: {},
            tempComp: this.props.comp
        }
    
            
          
    /*
    
          showAnswerField(field) {
        
            return(
              <Collapse in={this.state.open[field.key]}>
              <div id={"control" + field.key}>
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroup-sizing-sm" style={{color: "#286090"}}> Also Known as {this.props.comp.arabic_name}.
This Company is under {this.props.comp.regulated_law}.
 It's in the governorate of {this.props.comp.governorate}, in {this.props.comp.city} at {this.props.comp.address}.
The main Center Phone: {this.props.comp.main_center_phone}.
The main Center Fax: {this.props.comp.main_center_fax}.
It has an Equity Capital of {this.props.comp.equality_capital} and uses the {this.props.comp.currency} Currency.
The company is managed by {this.props.comp.managers.name}.</InputGroup.Text> 
                </InputGroup.Prepend>
                
              </InputGroup>
              </div>
            </Collapse>
            )
          }*/

          showAnswerField(field) {
        
            return(
              <Collapse in={this.state.open[field.key]}>
              <div id={"control" + field.key}>
              <Card size="sm" className="mb-3">
                
                  <CardBody id="inputGroup-sizing-sm" style={{color: "#286090"}}> Also Known as {this.props.comp.arabic_name}.
This Company is under {this.props.comp.regulated_law}.
 It's in the governorate of {this.props.comp.governorate}, in {this.props.comp.city} at {this.props.comp.address}.
The main Center Phone: {this.props.comp.main_center_phone}.
The main Center Fax: {this.props.comp.main_center_fax}.
It has an Equity Capital of {this.props.comp.equality_capital} and uses the {this.props.comp.currency} Currency.
The company is managed by {this.props.comp.managers.name}.</CardBody> 
                
                
              </Card>
              </div>
            </Collapse>
            )
          }
    
        
    
          
      
      
        render() {
          return (
            //  <h1>Heeeeeeelllllllllllooooooooooo</h1>



              <div className="p-1" >
        <Card  >
          <Card.Header>
          <div className="float-left"><img src={inag} alt="company pic" style={{borderRadius: "8px",width: "150px"}} /> {this.props.comp.english_name}</div>
          </Card.Header>

          <Card.Body>
          <Table style={{tableLayout:'fixed'}}>
          <tr>
              
            <div className="ml-auto p-2 bd-highlight">
            <td  style={{width:'50%'}}>
              <Card.Text className="float-left" style ={{textAlign:"left"}}>
              Company Arabic Name:{this.props.comp.arabic_name}
                <br />
                Company Type: {this.props.comp.form_type}
                </Card.Text> 
                </td>

                <div className="p-2 flex-shrink-1 bd-highlight">
                <td>
            <Form.Label style={{color: "white"}}>`</Form.Label> 
            <Button style ={{backgroundColor:'#286090',border:'#286090'}} value={this.props.comp.key} onClick={(e) => { e.preventDefault(); let c = this.state.open; c[this.props.comp.key] = !c[this.props.comp.key]; this.setState({open: c})}  }
          aria-controls={"control" + this.props.comp.key}
          aria-expanded={this.state.open[this.props.comp.key]} >View Details</Button></td>
          </div>
            </div>
            </tr>
            </Table>
          </Card.Body>




          <Card.Footer>
            <small className="mb-2">
            {this.showAnswerField(this.props.comp)}

              
            </small>
          </Card.Footer>
  
          </Card>
        </div>
          );
          }
        }
      
      
    
      
export default miniJournal;
