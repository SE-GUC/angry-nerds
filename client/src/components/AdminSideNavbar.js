import React, { Component } from 'react'
import {BrowserRouter,Route,Link, Redirect} from 'react-router-dom'; 
import { LinkContainer } from 'react-router-bootstrap'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Container from 'react-bootstrap/Container'

import Dropdown from 'react-bootstrap/Dropdown'
import DropdownType from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'; 
import Button from 'react-bootstrap/Button'
import Style from'@trendmicro/react-sidenav/dist/react-sidenav.css';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


const ddButton ={
    backgroundColor: '#286090',
    left:1070,
    top:-65,
    width:150,
    height:40,
    fontSize:15
}


const ddButton2 ={
    backgroundColor: '#286090',
    left:1047,
    top:-90,
    width:20,
    height:5,
    fontSize:15,
    
}

const ddItem={
    backgroundColor:"white",
    width:150,
    fontSize:13,
    height:40,
    left:500
}

const ddItem2={
    backgroundColor:"white",
    width:100,
    fontSize:12,
    height:40,
    left:500
   
    
}

const ddItem3={
    backgroundColor:"white",
    width:100,
    fontSize:12,
    height:40,
    left:500
   
    
}


const ddItem4={
    backgroundColor:"white",
    width:100,
    fontSize:12,
    height:40,
   
    
}

const SideNavbarStyle = {
    backgroundColor: '#286090',
    height:700,
    width:120,
    left:-120,
    top:-22
    
   
    
};
const DropdownStyle ={
    backgroundColor:'grey',
    height:100,
    width:60,
    left:200
}




// ButtonDropdown.propTypes = {
//     disabled: false,
//     backgroundColor: '#286090'
//     // direction: propTypes.oneOf(['up', 'down', 'left', 'right']),
//     // group: propTypes.bool,
//     // isOpen: propTypes.bool,
//     // tag: propTypes.string,
//     // toggle: propTypes.func
//   };
  
//   DropdownToggle.propTypes = {
//     // caret: propTypes.bool,
//     backgroundColor: '#286090',
//     disabled: false,
//     // onClick: PropTypes.func,
//     // 'data-toggle': PropTypes.string,
//     // 'aria-haspopup': PropTypes.bool
//   };




export class AdminSideNavbar extends Component {

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


      <LinkContainer to ="/AdminAddLawyer">    
        <NavItem eventKey="Register Lawyer">
        <NavIcon>
            <i class="fa fa-user"  style={{ fontSize: '1.75em' }} font-family= {FontAwesomeIcon}/>
        </NavIcon>
                <NavText>
                   Register Lawyer
                </NavText>
      </NavItem>
      </LinkContainer> 



         <LinkContainer to="/AdminAddReviewer">
            <NavItem eventKey="Register Reviewer">
            <NavIcon>
            <i class="fa fa-user"  style={{ fontSize: '1.75em' }} font-family= {FontAwesomeIcon}></i>
        </NavIcon>
                <NavText>
                   Register Reviewer
                </NavText>
            </NavItem>
            </LinkContainer>
            
            <LinkContainer to="/AdminAddAdmin">
            <NavItem eventKey="Register Admin">
            <NavIcon>
            <i class="fa fa-user"  style={{ fontSize: '1.75em' }} font-family= {FontAwesomeIcon}/>
        </NavIcon>
                <NavText>
                Register Admin
                </NavText>
                </NavItem>
            </LinkContainer>
            

                {/* </LinkContainer>  */}


            <NavItem eventKey="Delete">
            <NavIcon>
            <i class="fa fa-trash-o"  style={{ fontSize: '1.75em' }} font-family= {FontAwesomeIcon}></i>
            </NavIcon>
                <NavText>
                    Delete
                </NavText>
            
            <NavItem eventKey="Delete/Investor" >
            < a href = "/DeleteInvestor"/>
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

 <LinkContainer to="#editCompanies">
            <NavItem eventKey="Edit Companies">
            <NavIcon>
                <i className="glyphicon glyphicon-pencil" style={{ fontSize: '1.75em' }} font-family= {FontAwesomeIcon} />
            </NavIcon>
            <NavText>
               Edit Companies
            </NavText>
         </NavItem>
         </LinkContainer>

         <LinkContainer to="#viewComments">
         <NavItem eventKey="Comments">
         <NavIcon>
            <i class="fa fa-comment"  style={{ fontSize: '1.75em' }} font-family= {FontAwesomeIcon}></i>
            </NavIcon>
            <NavText>
               Comments
            </NavText>
         </NavItem>
        </LinkContainer>


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


        <LinkContainer to="#addLaw">
        <NavItem eventKey="Generate New Law">
            <NavIcon>
                <i className="fa fa-lightbulb-o" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
            Generate New Law
            </NavText>
         </NavItem>
</LinkContainer>

<LinkContainer to="#pricingStrategy">
         <NavItem eventKey="Pricing Strategy">
            <NavIcon>
                <i className="fa fa-credit-card" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
            Pricing Strategy
            </NavText>
         </NavItem>
         </LinkContainer>

         <LinkContainer to="#publishedCompanies">
         <NavItem eventKey="Published Companies">
                <NavIcon>
                    <i className="fa fa-trophy" style={{ fontSize: '1.75em' }} />
                </NavIcon>
            <NavText>
            Published Companies
            </NavText>
         </NavItem>
         </LinkContainer>


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

        <LinkContainer to="#sendMail">
        <NavItem eventKey="Send E-mails">
            <NavIcon>
                <i className="fa fa-envelope" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
            Sends E-mails
            </NavText>
         </NavItem>
        </LinkContainer>

 <LinkContainer to="#averageMins">
         <NavItem eventKey="Statistics">
            <NavIcon>
                <i className="glyphicon glyphicon-stats" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
            Statistics
            </NavText>
         </NavItem>
         </LinkContainer>

      
    </SideNav.Nav>
    </SideNav>
 </SideNav>


 <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>


 <DropdownToggle bg={ddButton} variant="dark" style ={ddButton}>SETTINGS</DropdownToggle>
      
        <DropdownMenu>
          <DropdownItem   bg={ddItem} variant="dark" style ={ddItem} href="/AdminChangePassword" >Change Password</DropdownItem>
          <DropdownItem   bg={ddItem} variant="dark" style ={ddItem} href="#resetPassword">Reset Password</DropdownItem>
          <DropdownItem  bg={ddItem} variant="dark" style ={ddItem} href="#forgotPassword" >Forgot Password</DropdownItem>
        </DropdownMenu>

</ButtonDropdown>

 



 <DropdownButton bg={ddButton2} variant="dark" style ={ddButton2}> 
{/* <Dropdown bg={ddButton2} variant="dark" style ={ddButton2}> FORM TYPE</Dropdown> */}
       
         <DropdownItem   bg={ddItem2} variant="dark" style ={ddItem2} href="#addFormType" >Add Form Type</DropdownItem>
         <DropdownItem   bg={ddItem3} variant="dark" style ={ddItem3}  href="#viewFormType" >View Form Type</DropdownItem>
         <DropdownItem  bg={ddItem4} variant="dark" style ={ddItem4}   href="#viewAllForms" >View All Forms</DropdownItem>
      
 </DropdownButton>



 
      </div>
    )

    
  }
}

export default AdminSideNavbar
