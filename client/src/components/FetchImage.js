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
    <Image src="http://localhost:3000/api/uploadPic/image/a918913dbb98b308052f69270b406333.jpg" roundedCircle height ="100"  width="100"/>    
    </Col>
    </Row>

      </div>
    )
  }
}

export default FetchImage
