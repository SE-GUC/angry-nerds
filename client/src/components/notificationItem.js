import React, { Component } from 'react';

export class notificationItem extends Component {
  getStyle = () => {
    return {
      background: '#1',
      padding: '1px',
      borderBottom: '1px #ccc solid',
      textAlign:'left'
    }
  }

  render() {
    const  text  = this.props.notification.text;
    return (
            
      <div style={this.getStyle()}>
        
          <button  class = "btn btn-primary btn-lg btn-block text-left" > {text} </button> 
        
        
      </div>
     
    )
  }
}



export default notificationItem
