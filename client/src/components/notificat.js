import React, { Component } from 'react';
import {FixedSizeList as List} from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { Row } from 'react-bootstrap';
import {render} from "react-dom" 
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownType from 'react-bootstrap/Dropdown'
import jwt from 'jsonwebtoken'
import axios from "axios"
const Investor = axios.get('localhost:3000/api/Investor')
const Reviewer = axios.get('localhost:3000/api/Reviewer')
const Lawyer = axios.get('localhost:3000/api/Lawyer')
// const Case = axios.get('localhost:3000/api/Cases'+CaseID)
const storedToken = localStorage.getItem('jwtToken')
// const str = storedToken.replace('','')
const tok = jwt.decode(storedToken)
// import Notifications, {notify} from 'react-notify-toast'
  const DropdownStyle ={
      backgroundColor:'grey',
      height:100,
      width:60,
      left:100
  }

export class notificat extends Component {

  state = {
    notifications: []
  }

  componentDidMount() {
    
    try{
  //   const storedToken = localStorage.getItem('jwtToken')
  // const str = storedToken.replace('','')
  // const tok = jwt.decode(str)
  // if(Reviewer.FindById(tok))
    // axios.get('http://localhost:3000/ReviewerMyNotifications').then(
    // res => this.setState({notifications: res.data.data}))
    // else if(Investor.FindById(tok))
    // axios.get('http://localhost:3000/InvestorMyNotifications').then(
    // res => this.setState({notifications: res.data.data}))
    // else if(Lawyer.FindById(tok))
    // axios.get('http://localhost:3000/LawyerMyNotifications').then(
    // res => this.setState({notifications: res.data.data}))
  } 
  catch(error){
    console.log(error)
  }  
}
              // nry(x){
              //   return(
              //   Case.findById(x).english_name
              //   )}
      
          notf(){ 
            try{
            // if(Reviewer.findById(tok))
            // if(this.props.type === 'Reviewer')
            // {
            // axios.get('http://localhost:3000/ReviewerMyNotifications'+tok).then(
            // res => this.setState({notifications: res.data.data}))
            //  } else if(Investor.findById(tok)){
            axios.get('http://localhost:3000/InvestorMyNotifications').then(
            res => this.setState({notifications: res.data.data}))
            //  }else if(Lawyer.findById(tok))
            // axios.get('http://localhost:3000/LawyerMyNotifications'+tok).then(
            // res => this.setState({notifications: res.data.data}))
          }catch(error){
            console.log(error)
        } 

            return (this.state.notifications.map((ha)=>(
              
            <DropdownType
                 color="grey"
                 size="lg"
                 title="Drop small"
               > 
             
               <Dropdown.Item href="#/action-1"> {ha.text}</Dropdown.Item>
              
               </DropdownType>
  
  )))
}

render() {
  return(
    
    <div>
    <DropdownButton id="dropdown-basic-button" title="Notifications">
                  
    {this.notf()}
    </DropdownButton>
                  
                  </div>
                  )
              
              
              
             }

            }


 export default notificat;
