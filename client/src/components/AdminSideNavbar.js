import React, { Component } from 'react'
import {BrowserRouter,Route,Link} from 'react-router-dom'; 
import { LinkContainer } from 'react-router-bootstrap'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownType from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'; 
import Button from 'react-bootstrap/Button'
import Style from'@trendmicro/react-sidenav/dist/react-sidenav.css';

const SideNavbarStyle = {
    backgroundColor: '#286090',
    height:725,
    width:110,
    
   
    
};
const DropdownStyle ={
    backgroundColor:'grey',
    height:100,
    width:60,
    left:200
}




export class AdminSideNavbar extends Component {
  render() {
    return (
       
      <div>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css"></link>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>
      

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
           
      
<LinkContainer to="#Cases">
        <NavItem eventKey="Cases Timing">
            <NavIcon>
            <i class="fa fa-clock-o" style={{ fontSize: '1.75em' }}  font-family= {FontAwesomeIcon} />
            </NavIcon>
            <NavText>
               Cases Timing
            </NavText>
         </NavItem>
         </LinkContainer>


          <LinkContainer to= "/AddLawyer"> 
          {/* <LinkContainer to= "/AddLawyer">  */}

        <NavItem eventKey="Register">
        <NavIcon>
            <i class="fa fa-user"  style={{ fontSize: '1.75em' }} font-family= {FontAwesomeIcon}/>
        </NavIcon>
                <NavText>
                   Register
                </NavText>

    
            <NavItem eventKey="Register/Lawyer">
                <NavText>
                    Lawyer
                </NavText>
                 <Link to="/AddLawyer"></Link>
            </NavItem>
           
         

            
            
            
            <NavItem eventKey="Register/Reviewer">
                <NavText>
                    Reviewer
                </NavText>
                </NavItem>
            <LinkContainer to="/AddReviewer"><NavItem eventKey="Register/Reviewer"> </NavItem></LinkContainer>
            

            <NavItem eventKey="Register/Admin">
                <NavText>
                    Admin
                </NavText>
                </NavItem>
            </NavItem>

                </LinkContainer> 


            <NavItem eventKey="Delete">
            <NavIcon>
            <i class="fa fa-trash-o"  style={{ fontSize: '1.75em' }} font-family= {FontAwesomeIcon}></i>
            </NavIcon>
                <NavText>
                    Delete
                </NavText>
            
            <NavItem eventKey="Delete/Investor">
                <NavText>
                    Investor
                </NavText>
            </NavItem>
            <NavItem eventKey="Delete/Lawyer">
                <NavText>
                    Lawyer
                </NavText>
            </NavItem>
            <NavItem eventKey="Delete/Reviewer">
                <NavText>
                    Reviewer
                </NavText>
            </NavItem>
            <NavItem eventKey="Delete/Admin">
                <NavText>
                    Admin
                </NavText>
                </NavItem>
            </NavItem>

            <NavItem eventKey="Edit Companies">
            <NavIcon>
                <i className="glyphicon glyphicon-pencil" style={{ fontSize: '1.75em' }} font-family= {FontAwesomeIcon} />
            </NavIcon>
            <NavText>
               Edit Companies
            </NavText>
         </NavItem>


         <NavItem eventKey="Comments">
         <NavIcon>
            <i class="fa fa-comment"  style={{ fontSize: '1.75em' }} font-family= {FontAwesomeIcon}></i>
            </NavIcon>
            <NavText>
               Comments
            </NavText>
         </NavItem>
        


         <NavItem eventKey="Leader Boards For">
         <NavIcon>
            <i class=" fa fa-users"  style={{ fontSize: '1.75em' }} font-family= {FontAwesomeIcon}></i>
            </NavIcon>
                <NavText>
                Leader Boards For
                </NavText>
            
            <NavItem eventKey="Leader Boards For/Lawyers">
                <NavText>
                    Lawyers
                </NavText>
            </NavItem>
            <NavItem eventKey="Leader Boards For/Reviewers">
                <NavText>
                    Reviewers
                </NavText>
            </NavItem>
        </NavItem>


        
        <NavItem eventKey="Generate New Law">
            <NavIcon>
                <i className="fa fa-lightbulb-o" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
            Generate New Law
            </NavText>
         </NavItem>


         <NavItem eventKey="Pricing Strategy">
            <NavIcon>
                <i className="fa fa-credit-card" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
            Pricing Strategy
            </NavText>
         </NavItem>


         <NavItem eventKey="Published Companies">
                <NavIcon>
                    <i className="fa fa-trophy" style={{ fontSize: '1.75em' }} />
                </NavIcon>
            <NavText>
            Published Companies
            </NavText>
         </NavItem>


         <NavItem eventKey="Remove">
         <NavIcon>
            <i class="fa fa-trash-o"  style={{ fontSize: '1.75em' }} font-family= {FontAwesomeIcon}></i>
            </NavIcon>
                <NavText>
                Remove
                </NavText>
            
            <NavItem eventKey="Remove/Case">
                <NavText>
                    Case
                </NavText>
            </NavItem>
            <NavItem eventKey="Remove/Question">
                <NavText>
                    Question
                </NavText>
            </NavItem>
        </NavItem>


        <NavItem eventKey="Send E-mails">
            <NavIcon>
                <i className="fa fa-envelope" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
            Sends E-mails
            </NavText>
         </NavItem>

         <NavItem eventKey="Statistics">
            <NavIcon>
                <i className="glyphicon glyphicon-stats" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
            Statistics
            </NavText>
         </NavItem>

         

        
         
         
         
    </SideNav.Nav>
    </SideNav>
 </SideNav>

 <DropdownButton id="dropdown-basic-button" title="Dropdown button">
 <DropdownType
        color="grey"
        size="lg"
        title="Drop small"
      > 
  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
  <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
  <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  </DropdownType>

</DropdownButton>
        
      </div>
    )

    
  }
}

export default AdminSideNavbar
