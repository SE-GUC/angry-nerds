import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';



  export class SideNavbar extends Component {
    render() {
      return(
      <Nav className="flex-column" variant="tabs" >
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/payment">Payment</Nav.Link>
      <Nav.Link href="/notification">Notifications</Nav.Link>
      </Nav>
      
      )
    }
  }

  


  export default SideNavbar;