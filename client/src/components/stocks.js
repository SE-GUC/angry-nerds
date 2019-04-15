import React, { Component,Spinner } from 'react'

class stocks extends Component {

    
    
   
  render() {
      return (
        <div style={{ overflow: "hidden", margin: "15px auto" ,maWidth: "600px"}} >
        <iframe scrolling="no" src="http://www.egx.com.eg/en/MarketWatchSectors.aspx" sandbox="allow-forms allow-scripts"  frameborder="0"
        style={{marginLeft: "-300px" ,height: "1000px" ,marginTop: "-385px" ,width: "1800px"}}>
        </iframe>
     </div>


      );
    }
  }


export default stocks



