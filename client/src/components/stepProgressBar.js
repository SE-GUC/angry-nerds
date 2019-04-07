import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import LawyerStep from '../Images/Lawyer.png'
import Reviewer from '../Images/reviewer.png'
import Waiting from '../Images/waiting.png'
import Published from '../Images/published.png'

class StepProgressBar extends React.Component {
  render() {
    
    return (
        
      <ProgressBar
        percent={100}
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
              src={Published} alt= "published"
            />
          )}
        </Step>
      </ProgressBar>
      
    );
  }
}

export default StepProgressBar;

