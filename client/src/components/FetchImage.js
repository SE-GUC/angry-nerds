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
      src="http://localhost:3000/image/91b79a646e8ca8a5ada55c3512b3c201.jpeg "       //   1fc6ad65287b346a516097c3bd84d026.jpg  sad cat
                                                                                     // "32b9d1e608c09eb1b9c9d26e418c4494.jpg" yara
                                                                                     // cfd4988535b8ab3558f79ef58dc660ab night king
      alt="new"
      /> */}


      <Row>
    <Col xs={6} md={4}>
    <Image src="http://localhost:3000/api/uploadPic/image/cfd4988535b8ab3558f79ef58dc660ab.jpg" roundedCircle height ="100"  width="100"/>    
    </Col>
    </Row>

      </div>
    )
  }
}

export default FetchImage
