import React, { Component } from 'react'
import NavBar from '../layout/navBar'
//import { ProgressBar } from 'react-bootstrap'
import StepProgressBar from '../components/stepProgressBar'


export class trackMyCase extends Component {
    render() {
        return (
            
            <div>
                <h1>Track my case</h1><br></br><br></br>
                <StepProgressBar/>
           
            </div>
        )
    }
}

export default trackMyCase
