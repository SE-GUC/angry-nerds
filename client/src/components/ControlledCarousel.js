//import Carousel from "react-bootstrap-carousel"
import  React, { Component } from 'react'
import Carousel from 'react-bootstrap/Carousel'
const image1 =require('../Images/oracle logo.png')
const image2 =require('../Images/CIB Logo.PNG')
const image3 =require('../Images/eva logo.png')

const Car= {
  width: "10"

}
   
  class ControlledCarousel extends React.Component {
    render() {
      return(

        


      <Carousel style={Car}>
        

<Carousel.Item>
<img
      className="d-block w-100"
      src={image1}
      alt="First slide"
    />
         <Carousel.Caption>
          <h3>First slide label</h3>
           <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
       </Carousel.Caption> 
</Carousel.Item>


<Carousel.Item>
<img
      className="d-block w-100"
      src={image2}
      alt="Second slide"
    />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
</Carousel.Item>


<Carousel.Item>
<img
      className="d-block w-100"
      src={image3}
      alt="Third slide"
    />
   <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
    </Carousel.Item>
    
    </Carousel>
      )
  }
}

  
 export default ControlledCarousel 