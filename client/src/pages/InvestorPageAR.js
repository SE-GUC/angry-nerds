import React, { Component } from 'react'
import ControlledCarousel from '../components/ControlledCarousel';  
import { LinkContainer, Container } from 'react-router-bootstrap'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { Nav, NavItem, NavLink } from 'reactstrap';
import Badge from'react-bootstrap/Badge'
import { Parallax } from "react-parallax";
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'
import {CardDeck , Col, Row}from 'react-bootstrap'
import Stocks from '../components/stocks';
const image1 =require('../Images/gafybuilding.jpg')
const image2 =require('../Images/gafi logo.jpg')
const image3 =require('../Images/stripe.png')
const image4 =require('../Images/fawry.png')


const SideNavbarStyle = {
    backgroundColor: '#286090',
    height:1800,
    width:190,
    left:-120,
    top:-22
    
   
    
}


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
    
        
 <div  >  
    <h1  align="center" fontFamily="Times New Roman"> <b> ! الان </b> </h1>
    <h2 align="center" ><b>

        !في اقل من يوم، بضغطة واحدة، شركتك على اتم إستعداد
    </b>
    </h2>
    <br/><br/>

    <h3 align="center" fontFamily="Impact" > <b>بعض شركاتنا</b></h3>
 <div >
 {/* style={{fontSize:"300%",align:"center"}} */}

  
        <ControlledCarousel/> </div>


          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css"></link>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>
      
     
  <CardDeck  style={{left:"70%", margin:100, width:1000}}>
  
 
  <Card style={{width:"90px", top:"70px"}}>
    <Card.Img variant="top" src={image2} />
    <Card.Body>
      <Card.Title align="center" fontFamily="Impact" >أقسام الشركات</Card.Title>
     
    </Card.Body>
    <Card.Text  align="center"style={{fontSize:15}}>
    SSC : شركة ذات مساهم واحد
      </Card.Text>
    <Card.Footer>
      <small className="text-muted">أخر تعديل منذ ثلاث دقائق</small>
    </Card.Footer>
  </Card>



  <Card style={{width:"90px", top:"70px"}}>
    <Card.Img variant="top" src={image1} />
    <Card.Body>
      <Card.Title>قم بزيارتنا</Card.Title>
      <Card.Text style={{fontSize:15}}>
      العنوان: 3 شارع صلاح سالم ، الاستاد ، مدينة نصر ، محافظة القاهرة
      هاتف:02 24055412
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted"> أخر تعديل منذ ثلاث دقائق</small>
    </Card.Footer>
  </Card>



  <Card style={{width:"90px", top:"70px"}}>
    <Card.Img variant="top" src={image2} />
    <Card.Body>
      <Card.Title align="center" fontFamily="Impact" fontSize="500">Types of companies</Card.Title>
   
    </Card.Body>
    <Card.Text align="center" style={{fontSize:15}}>
    SPC: Sole Proprietorship Company
      </Card.Text>
    
    <Card.Footer>
      <small className="text-muted"> أخر تعديل منذ ثلاث دقائق</small>
    </Card.Footer>
  </Card>
  
</CardDeck>



  



<SideNav
    onSelect={(selected) => {
        // Add your code here
    }}
>
<SideNav bg={SideNavbarStyle} variant="dark" style ={SideNavbarStyle}>
    {/* <SideNav.Toggle /> */}
   
    <SideNav.Nav defaultSelected="home">

        <LinkContainer to="/home">
            <NavItem eventKey="home" >
            <NavIcon >
                <i class ="fa fa-fw fa-home" style={{ fontSize: '1.75em' }}  font-family= {FontAwesomeIcon}   />    
             &nbsp; الصفحة الرئيسية</NavIcon>
            <NavText>
           
            </NavText>
              </NavItem>
        </LinkContainer>

        <LinkContainer to="/Companies">
         <NavItem eventKey="Published Companies">
                <NavIcon>
                    <i className="fa fa-trophy" style={{ fontSize: '1.75em' }} />
                &nbsp;الشركات المؤسسة </NavIcon>
            <NavText>
           
            </NavText>
         </NavItem>
         </LinkContainer>
     

         <LinkContainer to="/payment/:id">
         <NavItem eventKey="Pay Fees">
                <NavIcon>
                    <i className="fa fa-dollar" style={{ fontSize: '1.75em' }} />
                &nbsp;الدفع </NavIcon>
            <NavText>
           
            </NavText>
         </NavItem>
         </LinkContainer>


         <LinkContainer to="/createCase">
         <NavItem eventKey="Fill Form">
                <NavIcon>
                    <i className="fa fa-folder-open" style={{ fontSize: '1.75em' }} />
                &nbsp;طلب إنشاء شركة</NavIcon>
            <NavText>
           
            </NavText>
         </NavItem>
         </LinkContainer>



         <LinkContainer to="#updateCase">
         <NavItem eventKey="Update Form">
                <NavIcon>
                    <i className="fa fa-plus" style={{ fontSize: '1.75em' }} />
                &nbsp;تعديل طلب الإنشاء </NavIcon>
            <NavText>
           
            </NavText>
         </NavItem>
         </LinkContainer>




         <LinkContainer to="/InvViewProfile">
         <NavItem eventKey="View Profile">
                <NavIcon>
                    <i className="fa fa-user-circle-o" style={{ fontSize: '1.75em' }} />
                &nbsp;زيارة صفحتي </NavIcon>
            <NavText>
           
            </NavText>
         </NavItem>
         </LinkContainer>



         <LinkContainer to="/InvEditProfile">
         <NavItem eventKey="Edit Profile">
                <NavIcon>
                    <i className="fa fa-user-plus" style={{ fontSize: '1.75em' }} />
                &nbsp;تعديل صفحتي</NavIcon>
            <NavText>
           
            </NavText>
         </NavItem>
         </LinkContainer>



         <LinkContainer to="/AdminChangePassword">
         <NavItem eventKey="changePassword">
            <NavIcon>
                <i className="fa fa-lock" style={{ fontSize: '1.75em' }} />
             &nbsp;  تغيير كلمة المرور</NavIcon>
            <NavText>
          
            </NavText>
         </NavItem>
         </LinkContainer>


    </SideNav.Nav>
    </SideNav>
 </SideNav>


 <Col md={{ span: 0, offset: 5 }}>
 <h1>
   <Badge className="label label-primary" variant="Dark"  align="center">الاستثمار في الاقتصاد المتنامي في مصر</Badge>
  </h1> </Col>
    <Col md={{ span: 0, offset: 2 }}>
  <Stocks/></Col>
 

<br/><br/>

  
  <Row >
    
    <Col md={{ span: 3, offset: 3 }}>
      <Image src={image3} roundedCircle />
    </Col>
    <Col md={{ span: 3, offset: 0 }}>
    <h1>الدفع من خلال</h1></Col>
    <Col md={{ span: 3, offset:0 }}>
      <Image src={image4} roundedCircle />
    </Col>
   
  </Row>

 
</div> 
 
    )
  }
}

export default InvestorPage
