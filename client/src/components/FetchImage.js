import React, { Component  } from 'react'
import {Image,Row,Col} from 'react-bootstrap';

import axios from 'axios';


export class FetchImage extends Component {


// pic = ()=> {
//     try {
//         axios.get(`http://localhost:3000/image/91b79a646e8ca8a5ada55c3512b3c201.jpeg`)
//           .then(res => {
//             console.log(res);
//             console.log(res.data);
//           }) }
//           catch(e){
//             console.log(e)
//           } 

// }
                  

  render() {
    return (
      <div>
{/* <img 
      src="http://localhost:3000/image/91b79a646e8ca8a5ada55c3512b3c201.jpeg "
      alt="new"
      /> */}


      <Row>
    <Col xs={6} md={4}>
    <Image src="http://localhost:3000/image/56eed3911d46092375f8c33ded536312.jpeg" roundedCircle height ="100"  width="100"/>    
    </Col>
    </Row>

      </div>
    )
  }
}

export default FetchImage
