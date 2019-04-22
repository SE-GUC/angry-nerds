import React ,{ Component } from 'react'
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form'; 
import FormControl from 'react-bootstrap/FormControl'; 
import Button from 'react-bootstrap/Button'; 
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'; 
import notificat from './notificat';
import DropdownButton from 'react-bootstrap/DropdownButton'
import { Route, Redirect } from 'react-router-dom'
const navbar = {backgroundColor: '#286090'};


class mainNavBar extends Component  {

  switchToEng = () => {
    this.props.dispatch({type :"SWITCHtoENG"})
        }
    
        switchToAr = () => {
            this.props.dispatch({type :"SWITCHtoAR"})
        }
  
 
    



    render(){
    
    return (
        <React.Fragment>
          {console.log(this.props.lang)}
          <div className=".App__Aside"></div>
  
  <div className="App__Form"></div>

   <div className="PageSwitcher"> 
   </div> 
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>
          <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
         <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
       <Navbar bg={navbar} variant="dark" style ={navbar}>
    <Navbar.Brand href="/home">Angry Nerds</Navbar.Brand>

    <Nav className="mr-auto">
      <Nav.Link href="/home">Home</Nav.Link>
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Laws and Fees</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
      <Nav.Link href = "/notificat">Notifications</Nav.Link>
     
    {/* =============REDUX TEST==============================  */}
     <div>
          <button onClick={this.switchToEng} > To ENG</button>
          <span className="count">{this.props.lang}</span>
           <button onClick={this.switchToAr}> To AR</button>
      </div>
      {/* =================REDUX TEST=========================  */}
    </Nav>
    <Form inline>
      <Button href="/signin"  variant='outline-light'>Sign in</Button>
      &nbsp;
      <Button href="/signup" variant='outline-light'>Sign up</Button>
    </Form>
  </Navbar>

</React.Fragment>

        
  )
    }
}
const mapStateToProps = (state) => ({
  lang : state.lang 
})



export default connect(mapStateToProps)(mainNavBar)
  // ,mapDispatchToProps