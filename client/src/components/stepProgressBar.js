import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import LawyerStep from '../Images/Lawyer.png'
import Reviewer from '../Images/reviewer.png'
import Waiting from '../Images/waiting.png'
import Published from '../Images/published.png'
import axios from 'axios'
import jwt from 'jsonwebtoken'

class StepProgressBar extends React.Component {

  state = {
    status: ''
  }
  
  componentDidMount() {
    const storedToken = localStorage.getItem('jwtToken')
    const str = storedToken.replace('Bearer ', '')
    const token = jwt.decode(str)
    try{
    axios.get('http://localhost:3000/api/Cases/' + token.id).then(
          res =>{
            console.log(res)
            this.setState({status: res.data.data.caseStatus})
          } )
          
    
    }catch(error){
        console.log(error)
    }  
  }


  render() {
    
    var x=0
    if (this.state.status === 'pending')
      x = 66.67
    else if (this.state.status ==='published')
      x=100
    else if (this.state.status  ==='reviewer')
      x=33.3
    else if (this.state.status  === 'lawyer')
      x=0
      
    return (
<center>
      <ProgressBar

        percent={x}
        filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
        width="70%"
      >
        <Step transition="scale">
          {({ accomplished }) => (
            <img
              style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
              //width="300"
              src={LawyerStep} alt="Lawyer"
            />
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <img
              style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
              //width="300"
              src={Reviewer} alt="reviewer"
            />
          )}

        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <img
              style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
              //width="300"
              src={Waiting} alt="waiting"
            />
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <img
              style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
              //width="300"
              src={Published} alt="published"
            />
          )}
        </Step>
      </ProgressBar>
      </center>

    );
  }
}

export default StepProgressBar;

