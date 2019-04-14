import React, { Component } from 'react';
import notificationItem from './notificationItem';
import {FixedSizeList as List} from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
// import { Row } from 'react-bootstrap';
import "./styles.css";
import {render} from "react-dom" 

  // getStyle = () => {
  //   return {
  //     background: '#1',
  //     padding: '1px',
  //     borderBottom: '1px #ccc solid',
  //     textAlign:'left'
  //   }
  // }
  //   state= {
  //   notifications: [
  //     {
  //       id :1,
  //       text: 'go die',
  //       Date: '22-04-2019'
  //     },
  //     {
  //       id:2,
  //       text: 'relive',
  //       Date: '23-04-2019'
  //     }
  //   ]
  // }
  
const Row = ({ index, style }) => (
  <div className={index % 2 ? "ListItemOdd" : "ListItemEven"} style={style}>
      Row {index}
    </div>
  );

  const neela =() =>(

    <AutoSizer>
            {({height,width})=>(
              
              <List
              ClassName = "List"
              height = {height}
              itemCount = {1000}
              itemSize = {35}
              width = {width}
              >
{Row}
</List>

)}
      </AutoSizer>
  );
        // ))
        
        
        // render(<neela />, document.getElementById("root"), this.props.notifications.text);
//           return(this.state.pubCases.map((aCase) => 
//           ( <div>

//             {this.neela()}
//             </div>
//           )))
//         } 
          
//           this.props.notif.map((notification) => (
//               <notificationItem key={notification._id} notification={notification}  />


// }

//   render() {
//     // const  text  = this.props.notification.text;
//     return (
            
//       <div style={this.getStyle()}>
        
//           {/* <button  class = "btn btn-primary btn-lg btn-block text-left" > {text} </button>  */}
        
        
//       </div>
     
//     )
//   }
// }

