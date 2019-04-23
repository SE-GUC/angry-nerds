//import Carousel from "react-bootstrap-carousel"
import  React, { Component } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import { isAbsolute } from 'path';
const image1 =require('../Images/vodafone HD.jpg')
const image2 =require('../Images/Orascom HD.jpg')
const image3 =require('../Images/uber HD.jpg')
const image4 =require('../Images/microsoft HD.png')
const image5 =require('../Images/IBM HD.jpg')
const image6 =require('../Images/Oracle-Logos-HD.png')




const Carous = {
  //width:"40%",
  maxWidth:600,
 // marginBottom: "20px",
 // marginTop: "-20px",
 // top:"100%",
 top:"10px",
  left:"20%",
  boxSizing:100,
  //position:
 // display: flex,
  //width: 60px;
 // height:"5px",
 // marginRight: "5px",
 // display: inline-block,
 // transition: background 0.5s ease;
 // cursor: pointer
 // height:100,
//  position: isAbsolute
  // margin-left: auto;
  //   margin-right: auto;
  
 // height:"100%"
 
}
   
  class ControlledCarousel extends React.Component {
    render() {
      return(


      <Carousel style={Carous}>
<Carousel.Item>
  {/* <Carousel.Caption >
          <h3 style={{color:"black", fontFamily:"Impact", top:"10%"}}>Our Companies</h3>
       </Carousel.Caption>  */}
<img style={Carous}
      className="d-block w-100"
      src={image1}
      //alt="First slide"
    />
         
</Carousel.Item>


<Carousel.Item> 
  {/* <Carousel.Caption>
          <h3 style={{color:"black", fontFamily:"Impact", top:"10%"}}>Our Companies</h3>
        </Carousel.Caption> */}
<img style={Carous}
      className="d-block w-100"
      src={image2}
     // alt="Second slide"
    /> 
</Carousel.Item>


<Carousel.Item> 
  {/* <Carousel.Caption>
          <h3 style={{color:"black", fontFamily:"Impact", top:"10%"}}>Our Companies</h3>
        </Carousel.Caption> */}
<img 
      className="d-block w-100"
      src={image3}
     // alt="Third slide"
    />
    </Carousel.Item> 



    
<Carousel.Item> 
  {/* <Carousel.Caption>
          <h3 style={{color:"black", fontFamily:"Impact", top:"10%"}}>Our Companies</h3>
        </Carousel.Caption> */}
<img 
      className="d-block w-100"
      src={image4}
     // alt="Third slide"
    />
    </Carousel.Item> 


    
<Carousel.Item> 
  {/* <Carousel.Caption>
          <h3 style={{color:"black", fontFamily:"Impact", top:"10%"}}>Our Companies</h3>
        </Carousel.Caption> */}
<img 
      className="d-block w-100"
      src={image5}
     // alt="Third slide"
    />
    </Carousel.Item> 


    
<Carousel.Item> 
  {/* <Carousel.Caption>
          <h3 style={{color:"black", fontFamily:"Impact", top:"10%"}}>Our Companies</h3>
        </Carousel.Caption> */}
<img 
      className="d-block w-100"
      src={image6}
     // alt="Third slide"
    />
    </Carousel.Item> 
    </Carousel>










      )
  }
}

  
 export default ControlledCarousel 