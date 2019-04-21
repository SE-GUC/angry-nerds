//import Carousel from "react-bootstrap-carousel"
import  React, { Component } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import { isAbsolute } from 'path';
const image1 =require('../Images/oracle logo.png')
const image2 =require('../Images/CIB Logo.PNG')
const image3 =require('../Images/eva logo.png')



const Carous = {
  width:500,
 // top:"100%",
  left:300,
  boxSizing:100
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
  <Carousel.Caption>
          <h3 style={{color:"black"}}>Our Companies</h3>
       </Carousel.Caption> 
<img
      className="d-block w-100"
      src={image1}
      //alt="First slide"
    />
         
</Carousel.Item>


<Carousel.Item> 
  <Carousel.Caption>
          <h3 style={{color:"black"}}>Our Companies</h3>
        </Carousel.Caption>
<img
      className="d-block w-100"
      src={image2}
     // alt="Second slide"
    /> 
</Carousel.Item>


<Carousel.Item> 
  <Carousel.Caption>
          <h3 style={{color:"black"}}>Our Companies</h3>
        </Carousel.Caption>
<img
      className="d-block w-100"
      src={image3}
     // alt="Third slide"
    />
    </Carousel.Item> 
    </Carousel>










      )
  }
}

  
 export default ControlledCarousel 