import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
// import NavDropdown from 'react-bootstrap/NavDropdown'
// import DropdownButton from 'react-bootstrap/DropdownButton'
// import Dropdown from 'react-bootstrap/Dropdown'
// import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'




class LawyerToolbar extends Component {



  render() {
    return (

        <Navbar sticky="top" bg="light" expand="sm">
        <Navbar.Brand>All Cases ({this.props.totalCases})</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <select onChange={this.props.sortCards} title="Sort by" id="basic-nav-dropdown">
              <option >Name</option>
              <option >Fees</option>
              <option >Date</option>
              <option >Capital</option>

            </select>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" style={{}} onChange={this.props.filter} />
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default LawyerToolbar;


/**
 *   <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Dropdown link
    </a>

    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
      <a class="dropdown-item" href="#">Action</a>
      <a class="dropdown-item" href="#">Another action</a>
      <a class="dropdown-item" href="#">Something else here</a>
    </div>
  </div>
 */