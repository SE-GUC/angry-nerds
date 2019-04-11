import React, { Component } from 'react'
import StepProgressBar from '../components/stepProgressBar'


export class trackMyCase extends Component {
    render() {
        return (
            
            <div>
                <h1>Case status</h1><br></br><br></br>
                <StepProgressBar status={this.props}/>
           
            </div>
        )
    }
}

export default trackMyCase
