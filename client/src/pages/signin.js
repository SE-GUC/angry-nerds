import React ,{ Component } from 'react'
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form'; 
import jwt from 'jsonwebtoken'
import axios from 'axios';
import {InputGroup,FormControl,Row,Col,Card} from "react-bootstrap";
import '../App.css'
import { Route, Redirect } from 'react-router-dom'
import setAuthToken from '../helpers/setAuthToken';
const padding = {margin: '20'};
const image1 =require('../Images/logo.png')
const style = { backgroundImage:" url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAxMC8yOS8xMiKqq3kAAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzVxteM2AAABHklEQVRIib2Vyw6EIAxFW5idr///Qx9sfG3pLEyJ3tAwi5EmBqRo7vHawiEEERHS6x7MTMxMVv6+z3tPMUYSkfTM/R0fEaG2bbMv+Gc4nZzn+dN4HAcREa3r+hi3bcuu68jLskhVIlW073tWaYlQ9+F9IpqmSfq+fwskhdO/AwmUTJXrOuaRQNeRkOd5lq7rXmS5InmERKoER/QMvUAPlZDHcZRhGN4CSeGY+aHMqgcks5RrHv/eeh455x5KrMq2yHQdibDO6ncG/KZWL7M8xDyS1/MIO0NJqdULLS81X6/X6aR0nqBSJcPeZnlZrzN477NKURn2Nus8sjzmEII0TfMiyxUuxphVWjpJkbx0btUnshRihVv70Bv8ItXq6Asoi/ZiCbU6YgAAAABJRU5ErkJggg=="}




//ARABIC ENGISH start
const mapStateToProps = (state) => ({
  lang : state.lang 
})
//ARABIC ENGISH end

class signin extends Component  {
  state={
    toHome : false,
    type: 'password',
    userHome:'',
    email:'',
    password:''
  }
  
    async submit (event){
      event.preventDefault();
      console.log(this.state.email)
      console.log(this.state.password)
      try{

        const user = await axios({
            method: "post",
            url: "http://localhost:3000/login" ,
            data: {
              email : this.state.email,
              password : this.state.password
            }
          })
          console.log('HAHAHAHAHAHA',user.data)
          if (user.data.data!=='You need to verify the email that is used in registeration'){
            localStorage.setItem('jwtToken',user.data.data)
            axios.defaults.headers.common['Authorization'] = user.data.data
            console.log(axios.defaults.headers.common['Authorization'])
            const tok = localStorage.getItem('jwtToken').replace('Bearer ','')
            const decoded = jwt.decode(tok)
            console.log(decoded.type)
            switch(decoded.type){
              case 'investor' : this.setState({userHome:'/InvestorPage'}) ; break ;
              case 'lawyer' : this.setState({userHome:'/LawyerHome'}) ; break ;
              case 'reviewer' : this.setState({userHome:'/ReviewerHome'}) ; break ;
              case 'admin' : this.setState({userHome:'/AdminPage'}) ; break ;
              default : this.setState({userHome:'/signin'})
            }
            this.setState({toHome: true})
            console.log(this.state.toHome)
          }else{
            alert("You need to verify your mail") 
          }
        
        }
        catch(error)
        {
          alert(error)
        }
    }

    handleClick = () => this.setState(({type}) => ({
      type: type === 'text' ? 'password' : 'text'
    }))

    

    render(){
      if (this.state.toHome===true){
        return (<Redirect to={{pathname:this.state.userHome}} />)
        }else{
          //ARABIC ENGISH start
          //this to check what is the chose
          if (this.props.lang==='ENG') {
    return (
      <React.Fragment>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css"/>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
        <Row style={{height: .12*window.innerHeight + 'px'}}>  </Row>
        <legend  className="the-legend" style={{color: "#428bca"}}>Sign in</legend>        
        <Col md={{ span: 2, offset: 2 }}>
        <Row style={{height: .05*window.innerHeight + 'px'}} />
         <img src={image1} /> </Col>
        <Col md={{ span: 4, offset: 1 }}>
        <Row style={{height: .05*window.innerHeight + 'px'}} />
        <InputGroup className="mb-3">
        <Form.Label style={{color: "#428bca"}}>Email address</Form.Label>
        <FormControl type="mail" placeholder="mail@example.com" 
        onChange={(e) => {this.setState({email:e.target.value})}} required/>
      </InputGroup>
      <InputGroup className="mb-3">
        <Form.Label style={{color: "#428bca"}}>Password</Form.Label>
        <FormControl type={this.state.type} placeholder="Password" 
        onChange={(e) => {this.setState({password:e.target.value})}} required />
        <InputGroup.Append>
          <Button className="glyphicon glyphicon-eye-open" variant="outline" onClick={this.handleClick} />
        </InputGroup.Append>
      </InputGroup>
      <Col md={{ span: 10, offset: 6 }}>
      <Card.Link href="http://localhost:3001/ForgetPassword" style={{textDecoration: 'underline'}} >Forgotten Password ?</Card.Link></Col>
      <Row style={{height: .04*window.innerHeight + 'px'}}>  </Row>
      <Col md={{ span: 4, offset: 8 }}>
      <Button variant="primary" type="submit" onClick={this.submit.bind(this)}>Sign in</Button></Col>
      </Col>
      </React.Fragment>        
  )
    }else{
      return (
        <React.Fragment>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css"/>
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
          <Row style={{height: .12*window.innerHeight + 'px' }}>  </Row>
          <legend  className="the-legend" style={{color: "#428bca",textAlign:"right"}}>تسجيل دخول</legend>        
          <Col md={{ span: 2, offset: 3 }}>
          <Row style={{height: .05*window.innerHeight + 'px'}} />
           <img src={image1} /> </Col>
          <Col md={{ span: 4, offset: 1 }} style={{color: "#428bca",textAlign:"right"}}>
          <Row style={{height: .01*window.innerHeight + 'px'}} />
          <InputGroup className="mb-3">
          <Form.Label style={{color: "#428bca"}}>البريد الإلكتروني</Form.Label>
          <FormControl type="mail" placeholder="mail@example.com" 
          onChange={(e) => {this.setState({email:e.target.value})}} required/>
        </InputGroup>
        <InputGroup className="mb-3">
          <Form.Label style={{color: "#428bca"}}>كلمة السر</Form.Label>
          <FormControl type={this.state.type} placeholder="Password" 
          onChange={(e) => {this.setState({password:e.target.value})}} required />
          <InputGroup.Append>
            <Button className="glyphicon glyphicon-eye-open" variant="outline" onClick={this.handleClick} />
          </InputGroup.Append>
        </InputGroup>
        <Col md={{ span: 7, offset: 0 }}>
        <Card.Link href="http://localhost:3001/ForgetPassword" style={{textDecoration: 'underline'}} >هل نسيت كلمة المرور ؟</Card.Link></Col>
        <Row style={{height: .04*window.innerHeight + 'px'}}>  </Row>
        <Col md={{ span: 4, offset: 0 }}>
        <Button variant="primary" type="submit" onClick={this.submit.bind(this)}>تسجيل الدخول</Button></Col>
        </Col>
        </React.Fragment>        
    )
    }
    }
  }
  
}





export default connect(mapStateToProps)(signin)
