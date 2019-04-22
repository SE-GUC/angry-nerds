import React, { Component } from 'react'
import ControlledCarousel from '../components/ControlledCarousel';
import { LinkContainer } from 'react-router-bootstrap'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { Nav, NavItem, NavLink } from 'reactstrap';
import { Parallax } from "react-parallax";
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
const image1 =require('../Images/gafybuilding.jpg')
const image2 =require('../Images/gafi logo.jpg')
const image3 =require('../Images/eva logo.png')

const SideNavbarStyle = {
    backgroundColor: '#286090',
    height:1100,
    width:190,
    left:-120,
    top:-22
    
   
    
};

export class InvestorPage extends Component {

    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          dropdownOpen: false
        };
      }

      
    
      toggle() {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
      }





  render() {

    return (
    
        
 <div >
<div >
        <ControlledCarousel/> </div>


          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css"></link>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>
      
     
          <CardDeck  style={{left:"30%", margin:100}}>
  <Card style={{width:"90px"}}>
    <Card.Img variant="top" src={image1} />
    <Card.Body>
      <Card.Title>Visit Us</Card.Title>
      <Card.Text style={{fontSize:15}}>
      Address: 3 Salah Salem St, Al Estad, Nasr City, Cairo Governorate
      Phone: 02 24055412
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Last updated 3 mins ago</small>
    </Card.Footer>
  </Card>
 
  <Card>
    <Card.Img variant="top" src={image2} />
    <Card.Body>
      <Card.Title>Through the Web Portal</Card.Title>
     <a  style ={{fontSize:15}} href= "http://angrynerds1.herokuapp.com">Visit our Website </a>
    </Card.Body>
    
    <Card.Footer>
      <small className="text-muted">Last updated 3 mins ago</small>
    </Card.Footer>
  </Card>
  
</CardDeck>




<SideNav
    onSelect={(selected) => {
        // Add your code here
    }}
>
<SideNav bg={SideNavbarStyle} variant="dark" style ={SideNavbarStyle}>
    <SideNav.Toggle />
   
    <SideNav.Nav defaultSelected="home">

        <LinkContainer to="/home">
            <NavItem eventKey="home">
            <NavIcon>
                <i class ="fa fa-fw fa-home" style={{ fontSize: '1.75em' }}  font-family= {FontAwesomeIcon}   />    
            </NavIcon>
            <NavText>
                Home
            </NavText>
              </NavItem>
        </LinkContainer>
    </SideNav.Nav>
    </SideNav>
 </SideNav>


 
</div> 
 
    )
  }
}

export default InvestorPage
