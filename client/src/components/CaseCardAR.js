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
import ContractButtonAR from '../components/ContractButtonAR'


class CaseCardAR extends Component {

  state = {
    basket: '',
    toCasePage: false
  }

  openCase(e) {
    e.preventDefault()
    //this.setState({toCasePage: true})
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
   
    axios.get(path).then(res => {console.log(res);  })
    (this.props.type === 'lawyer')?this.props.history.push('/LawyerOpenCase/' + this.props.case._id):this.props.history.push('/ReviewerOpenCase/' + this.props.case._id)
    //this.props.history.push('lawyerOpenCase/' + oneCase._id);
  }

  buttonSetter = (oneCase) => {
   
    if(oneCase.locked){
      return(
        <div>
        <Button onClick={this.openCase.bind(this)} className="float-left"
          style ={{backgroundColor:'#286090',border:'#286090'}} disabled>
         تفاصيل الشركة
        </Button>
        </div>
      )
    }else{
      return(
        <div className="float-left">
        <Button onClick={this.openCase.bind(this)} 
          style ={{backgroundColor:'#286090',border:'#286090'}}>
          تفاصيل الشركة
        </Button>
        <div style={{clear:'both'}}></div>
        <div> &nbsp;</div> 
        <ContractButtonAR id={this.props.case._id}></ContractButtonAR>
        </div>

      )
    }
  }

  iconSetter = (oneCase) => {
    let now = new Date();
    let date = new Date(oneCase.log[oneCase.log.length-1].date);

    if(oneCase.locked){
      return (
          <IconContext.Provider value={{ className: "float-left" ,size: "1.5em"}}>
            <div>
              <FaLock />
            </div>
          </IconContext.Provider>
        )
    }
    else{
      if(now.getTime() - date.getTime() > 1000 * 60 * 60 * 24 * 3){
        return (
          <IconContext.Provider value={{ color: "#EDC845", className: "float-left" ,size: "2em"}}>
            <div>
              <IoIosWarning />
            </div>
          </IconContext.Provider>
        )
      }
      else{
        return (
          <IconContext.Provider value={{ color: "green", className: "float-left" ,size: "1.5em"}}>
            <div>
              <FaLockOpen />
            </div>
          </IconContext.Provider>
        )
      }
    }
  }

  returnDateString(now,date){
    if((now.getTime() - date.getTime()) / (1000 * 60 * 60) > 24){
      return(
       <div className='float-left'>{ Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)) + ' أيام مضت' }</div>
      )
    }else{
      return(
        <div className='float-left'>{ Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60)) + ' ساعات مضت' }</div>
      )
    }
  }


  render() {

   
    let now = new Date();
    let date = new Date(this.props.case.log[this.props.case.log.length-1].date);
    const bg = "light"
    const text = "black"
    // const iconColour =  now.getTime() - date.getTime() < 1000 * 60 * 60 * 24 * 3
    //     ? "black"
    //     : "red";    

    return (

      <div className="p-1" >
        <Card bg={bg} text={text} >
          <Card.Header>
          <div className="float-right">{this.props.case.english_name}</div>
          {this.iconSetter(this.props.case)}        
          </Card.Header>

          <Card.Body>
            <div className="ml-auto p-2 bd-highlight">
              <Card.Text className="float-right" style ={{textAlign:"right"}}>
              <samp>{this.props.case._id} </samp>  :رقم الشركة
                <br />
              ${this.props.case.equality_capital} :رأس المال
                <br />
             {this.props.case.form_type}  :نوع الشركة
                </Card.Text>
                {this.buttonSetter(this.props.case)}
                
                
            </div>
          </Card.Body>

          <Card.Footer>
            <small className="mb-2">
              {this.returnDateString(now,date)}
            </small>
          </Card.Footer>
        </Card>
      </div>
    );
  }
  
}

export default CaseCardAR;
