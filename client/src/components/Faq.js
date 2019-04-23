import React, { Component } from 'react'

export class Faq extends Component{
    state = {isHidden: true}
    toggleHidden = ()=>this.setState((prevState)=>({isHidden: !prevState.isHidden}))
    render(){
     return(
        <div>
        <span onClick={this.toggleHidden}>
              <strong>{this.props.question}</strong></span>
              {!this.state.isHidden && <p>{this.props.answer}</p>}   
        </div>
     )
    }
   }

export default Faq
