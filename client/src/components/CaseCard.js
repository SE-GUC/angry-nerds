import React, { Component } from "react";
import { Redirect } from 'react-router'
import axios from 'axios'
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Button"; 
import Button from "react-bootstrap/Button";
import { IconContext } from "react-icons";
import {FaLock} from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import {FaLockOpen} from "react-icons/fa";
import ContractButton from '../components/ContractButton'


class CaseCard extends Component {

  state = {
    basket: '',
    toCasePage: false
  }

  openCase(e) {
    e.preventDefault()
    this.setState({toCasePage: true})
    console.log('before  ==> ',this.props.pressed)
    this.props.caseButton(this.props.case._id)
    console.log('after  ==> ',this.props.pressed)
    let path
    if(this.props.type === 'lawyer'){
      path = 'http://localhost:3000/lawyerOpenCase/' + this.props.case._id }
    else{
      if(this.props.type === 'reviewer'){
        path = 'http://localhost:3000/reviewerOpenCase/' + this.props.case._id }
      }
    try{
      console.log('get')
    axios.get(path).then(res => console.log(res))}
    catch(e){
      console.log(e)
    }
    //this.props.history.push('lawyerOpenCase/' + oneCase._id);
  }

  buttonSetter = (oneCase) => {
    console.log(this.props.pressed)
    if(this.props.pressed !== null && this.props.pressed === oneCase._id){
      console.log('LOCK-LOCK-LOCK')
      return(
        <Button className="float-right" disabled>
           <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <span className="sr-only">Loading...</span>
        </Button>
      )
    }

    if(oneCase.locked){
      return(
        <div>
        <Button onClick={this.openCase.bind(this)} className="float-right"
          style ={{backgroundColor:'#286090',border:'#286090'}} disabled>
          Open Case
        </Button>
        </div>
      )
    }else{
      return(
        <div className="float-right">
        <Button onClick={this.openCase.bind(this)} 
          style ={{backgroundColor:'#286090',border:'#286090'}}>
          Open Case
        </Button>
        <div style={{clear:'both'}}></div>
        <div> &nbsp;</div> 
        <ContractButton id={this.props.case._id}></ContractButton>
        </div>

      )
    }
  }

  iconSetter = (oneCase) => {
    let now = new Date();
    let date = new Date(oneCase.log[0].date);

    if(oneCase.locked){
      return (
          <IconContext.Provider value={{ className: "float-right" ,size: "1.5em"}}>
            <div>
              <FaLock />
            </div>
          </IconContext.Provider>
        )
    }
    else{
      if(now.getTime() - date.getTime() > 1000 * 60 * 60 * 24 * 3){
        return (
          <IconContext.Provider value={{ color: "#EDC845", className: "float-right" ,size: "2em"}}>
            <div>
              <IoIosWarning />
            </div>
          </IconContext.Provider>
        )
      }
      else{
        return (
          <IconContext.Provider value={{ color: "green", className: "float-right" ,size: "1.5em"}}>
            <div>
              <FaLockOpen />
            </div>
          </IconContext.Provider>
        )
      }
    }
  }


  render() {

    if(this.state.toCasePage){
      if(this.props.type === 'lawyer'){
      return (
        <Redirect to={'/LawyerOpenCase/' + this.props.case._id} />
      )
      }
      else{
        if(this.props.type === 'reviewer') {
          return(
          <Redirect to={'/ReviewerOpenCase/' + this.props.case._id} />
          )
        }
      }
    }
    else{
    let now = new Date();
    let date = new Date(this.props.case.log[0].date);
    const bg = "light"
    const text = "black"
    // const iconColour =  now.getTime() - date.getTime() < 1000 * 60 * 60 * 24 * 3
    //     ? "black"
    //     : "red";    

    return (

      <div className="p-1" >
        <Card bg={bg} text={text} >
          <Card.Header>
          <div className="float-left">{this.props.case.english_name}</div>
          {this.iconSetter(this.props.case)}        
          </Card.Header>

          <Card.Body>
            <div className="ml-auto p-2 bd-highlight">
              <Card.Text className="float-left" style ={{textAlign:"left"}}>
                Case ID: <samp>{this.props.case._id} </samp>
                <br />
                Capital: {this.props.case.equality_capital}$
                <br />
                Case Type: {this.props.case.form_type}$
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
}

export default CaseCard;
