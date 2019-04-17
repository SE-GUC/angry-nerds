import React, { Component } from 'react';
import {FixedSizeList as List} from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { Row } from 'react-bootstrap';
import {render} from "react-dom" 
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownType from 'react-bootstrap/Dropdown'
// import jwt from 'jsonwebtoken'
import axios from "axios"
// const Investor = require('../../../Server/app/models/Investor')
// const Reviewer = require('../../../Server/app/models/Reviewer')
// const Lawyer = require('../../../Server/app/models/Lawyer')

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
    axios.get('http://localhost:3000/ReviewerMyNotifications').then(
    res => this.setState({notifications: res.data.data}))
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
      
          notf(){

            return (this.state.notifications.map((ha)=>(
            <DropdownType
                 color="grey"
                 size="lg"
                 title="Drop small"
               > 
  
               <Dropdown.Item href="#/action-1">{ha.text}</Dropdown.Item>
              
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
