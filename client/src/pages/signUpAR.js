import React, { Component } from 'react'
import {Form,InputGroup, Button,ButtonGroup,FormControl,Col,Row, Container} from 'react-bootstrap'
import axios from 'axios'
import Verifypassword from '../components/passwordinReset'
const image1 =require('../Images/logo.png')


  const border ={
    border: 'dbdbdb'
    //  solid 1px,
    
  }
  const field ={
    width: 300
  }

  const form ={
    left:1100
  }

class SignUp extends Component {

state={
  firstName : '',
  MiddleName : '',
  LastName : '',
  email : '',
  password :'',
  ID_type : '',
  SSID : '',
  Nationality : '',
  Type : '',
  Address :'',
  birthdate : '',
  telephone_number : '',
  gender : '',
  password1:"",
  confirmPassword:"",
  type1: 'password',
  type2: 'password',
  lowerCase:"text-danger",
  upperCase:"text-danger",
  number:"text-danger",
  minimum:"text-danger",
  confirmed:"text-danger",
  lowerCaseText:"✖ LowerCase",
  upperCaseText:"✖ UpperCase",
  numberText:"✖ Number",
  minimumText:"✖ Minimum Length 8",
  confirmedText:"✖ Match",
  passwordFlag:true,
  matchFlag:true,
  submitButton:true
}



  myFunction(event) {
    console.log('hiiii')
      var x = document.getElementById("password");
      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
      }
    } 

    validate (e){
      const pass = e
      this.setState({password1:pass})
      this.match1(this.state.confirmPassword1,pass)
          const lowerCaseLetters = /[a-z]/g;
          const upperCaseLetters = /[A-Z]/g;
          const numbers = /[0-9]/g;
  
          if (lowerCaseLetters.test(pass)){
              this.setState({lowerCase:"text-success"})  
              this.setState({lowerCaseText:"✔ LowerCase"})
          }else{
              this.setState({lowerCase:"text-danger"})
              this.setState({lowerCaseText:"✖ LowerCase"})        
          }
  
          if (upperCaseLetters.test(pass)){
              this.setState({upperCase:"text-success"})
              this.setState({upperCaseText:"✔ UpperCase"})            
          }else{
              this.setState({upperCase:"text-danger"})
              this.setState({upperCaseText:"✖ UpperCase"})            
          }
  
          if (pass.length>7){
              this.setState({minimum:"text-success"})
              this.setState({minimumText:"✔ Minimum Length 8"})            
         }else{
             this.setState({minimum:"text-danger"})
             this.setState({minimumText:"✖ Minimum Length 8"})            
         }
  
          if (numbers.test(pass)){
              this.setState({number:"text-success"})
              this.setState({numberText:"✔ Number"})    
          }else{
              this.setState({number:"text-danger"})    
              this.setState({numberText:"✖ Number"})
          }
  
    }
    
    match(e){
      const pass = e.target.value
      this.setState({confirmPassword:pass})
      if (pass===this.state.password1){
          this.setState({confirmed:"text-success"})
          this.setState({confirmedText:"✔ Match"})
          this.setState({matchFlag:false}) 
      }else{
          this.setState({confirmed:"text-danger"})    
          this.setState({confirmedText:"✖ Match"})
          this.setState({matchFlag:true}) 
      }
    }
  
    match1(pass,x){
      if (pass===x){
          this.setState({confirmed:"text-success"})
          this.setState({confirmedText:"✔ Match"}) 
          this.setState({matchFlag:false}) 
        }else{
          this.setState({confirmed:"text-danger"})    
          this.setState({confirmedText:"✖ Match"})
          this.setState({matchFlag:true}) 
      }
    }
  
    handleClick1 = () => this.setState(({type1}) => ({
      type1: type1 === 'text' ? 'password' : 'text'
    }))
  
    handleClick2 = () => this.setState(({type2}) => ({
      type2: type2 === 'text' ? 'password' : 'text'
    }))
  
  

// async submit (event){
//     event.preventDefault
// }
OnClick1(event){
    console.log('here')
   event.preventDefault()  
    
try{  
    console.log('my first name is ' + this.state.firstName)
    console.log('my first name is ' + this.state.MiddleName)
    console.log('my first name is ' + this.state.LastName)
    console.log('my first name is ' + this.state.email)
    console.log('my first name is ' + this.state.ID_type)
    console.log('my first name is ' + this.state.SSID)
    console.log('my first name is ' + this.state.Nationality)
    console.log('my first name is ' + this.state.Type)
    console.log('my first name is ' + this.state.Address)
    console.log('my first name is ' + this.state.birthdate)
    console.log('my first name is ' + this.state.telephone_number)
    console.log('my first name is ' + this.state.gender)

    
axios({
    method: 'post',
    url: 'http://localhost:3000/register',
    headers: {},
    data: {
        firstName : this.state.firstName,
        MiddleName : this.state.MiddleName,
        LastName : this.state.LastName,
        email : this.state.email,
        password : this.state.password,
        ID_type : this.state.ID_type,
        SSID : this.state.SSID,
        Nationality : this.state.Nationality,
        Type : this.state.Type,
        Address : this.state.Address,
        birthdate : this.state.birthdate,
        telephone_number : this.state.telephone_number,
        gender : this.state.gender

    }
  }).then(
  res => {alert(res)}
 )


} catch(error){
console.log(error)
}  

}
 
    constructor(props) {
      super(props);
    //   this.state = {
    //     startDate: new Date()
    //   };
       this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(event) {
      console.log(event.target.name)
      console.log(event.target.value)
      if (event.target.name==='password'){
          this.validate(event.target.value)
      }
      this.setState({
           [event.target.name] : event.target.value
      });
    }

  render() {
    return (
      
      <React.Fragment align="right">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css"/>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
    <Col md={{ span: 10, offset: 0 }}>
        <Form> 
    <Col md={{ span: 0, offset: 3 }}>
    <Form.Label style={{color: "#428bca",textDecoration: 'underline',fontSize:25}} >GAFIمرحبًا بك في</Form.Label>      
      </Col>
        <Row>
      <Col md={{ span: 0, offset: 0 }}>
        <Form.Group controlId="firstName" bg={field} variant="dark" style ={field} align="right">
          <Form.Label>الإسم الأول</Form.Label>
          <Form.Control type="firstName"  placeholder="ادخل الإسم الأول" name ="firstName" onChange = {this.handleChange.bind(this)} /> 
        </Form.Group>
        </Col>
        <Col md={{ span: 0, offset: 1 }}></Col>      
        <Form.Group controlId="MiddleName"  bg={field} variant="dark" style ={field} align="right">
          <Form.Label>الإسم الأوسط</Form.Label>
          <Form.Control type="MiddleName"  placeholder="ادخل اسمك الأوسط " name="MiddleName"  onChange = {this.handleChange.bind(this)}/>
        </Form.Group>
        </Row>

        <Row>
        <Col md={{ span: 0, offset: 0 }}>
        <Form.Group controlId="LastName"  bg={field} variant="dark" style ={field} align="right">
          <Form.Label>إسم العائلة</Form.Label>
          <Form.Control type="LastName" placeholder="ادخل اسم العائلة" name="LastName"  onChange = {this.handleChange.bind(this)}/>
        </Form.Group>      
        <Form.Group controlId="email"  bg={field} variant="dark" style ={field} align="right">
          <Form.Label>البريد الإلكتروني</Form.Label>
          <Form.Control type="email" placeholder="ادخل البريد الإلكتروني" name ="email"  onChange = {this.handleChange.bind(this)} />
          <Form.Text className="text-muted">
          لن نشارك بريدك الإلكتروني مع أي شخص آخر.
          </Form.Text>
        </Form.Group>
        </Col>
        
        <Col md={{ span: 0, offset: 1 }}>    
        <Form.Group controlId="password"  bg={field} variant="dark" style ={field} align="right">
        <InputGroup className="mb-3">    
        <Form.Label>كلمه السر</Form.Label>
        <FormControl type={this.state.type1} placeholder="ادخل كلمة السر" ref="psw" 
            onChange = {this.handleChange.bind(this)} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" name ="password" required
            title="يجب أن يحتوي على رقم واحد على الأقل وحرف كبير وأحرف صغيرة ، وعلى الأقل 8 أحرف أو أكثر"/>
        <InputGroup.Append>
          <Button className="glyphicon glyphicon-eye-open" variant="outline" onClick={this.handleClick1} />
        </InputGroup.Append>
        </InputGroup>
        <Row style={{height: .01*window.innerHeight + 'px'}} />
      <Row>
          <Col md={{ span: 0, offset: 1 }}>
          <p className={this.state.lowerCase} >{this.state.lowerCaseText}</p>
          </Col>
          <Col md={{ span: 0, offset: 3 }}>
          <p className={this.state.upperCase}>{this.state.upperCaseText}</p>
          </Col>            
        </Row>
        <Row>
        <Col md={{ span: 0, offset: 1 }}>
            <p className={this.state.minimum}>{this.state.minimumText}</p>          
          </Col>
          <Col md={{ span: 0, offset: 1 }}>
           <p className={this.state.number}>{this.state.numberText}</p>          
          </Col>       
        </Row>
        </Form.Group>

        </Col>

        </Row>
      <Row>
      <Col md={{ span: 0, offset: 0 }}>
        <Form.Group controlId="SSID"  bg={field} variant="dark" style ={field} align="right">
          <Form.Label>رقم الهوية الشخصية</Form.Label>
          <Form.Control type="SSID" placeholder="ادخل رقم الهوية الشخصية" name="SSID" onChange = {this.handleChange.bind(this)}/>
        </Form.Group>
        <Form.Group controlId="Type"  bg={field} variant="dark" style ={field} align="right">
          <Form.Label>{"النوع"}</Form.Label>
        <input type="radio" name="Type" value="Passport"  onChange={this.handleChange.bind(this)}/> جواز سفر &nbsp;
        <input type="radio" name="Type" value="National ID"   onChange={this.handleChange.bind(this)}/> الرقم القومي
        </Form.Group>
        </Col>
      <Col md={{ span: 0, offset: 1 }}></Col>
      <Form.Group controlId="confirmPassword"  bg={field} variant="dark" style ={field} align="right">
      <InputGroup className="mb-3">
      <Form.Label>تأكيد كلمة المرور</Form.Label>
      <FormControl type={this.state.type2} placeholder="ادخل تأكيد كلمة المرور" 
          onChange={(e) => {this.match(e)}} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required
          title="يجب أن يتطابق مع كلمة المرور التي أدخلتها من قبل"/>
      <InputGroup.Append>
        <Button className="glyphicon glyphicon-eye-open" variant="outline" onClick={this.handleClick2} align="right" />
      </InputGroup.Append>
      </InputGroup>
    <Row>
          <Col md={{ span: 0, offset: 1 }}>
          <p className={this.state.confirmed}>{this.state.confirmedText}</p>
          </Col>           
    </Row>
      </Form.Group>

        </Row>
        
        <Row>
        
        <Form.Group controlId="Nationality"  bg={field} variant="dark" style ={field} align="right">
          <Form.Label>الجنسية</Form.Label>
          <Form.Control type="Nationality" placeholder="ادخل الجنسية" name="Nationality" onChange = {this.handleChange.bind(this)}/>
        </Form.Group>
        <Col md={{ span: 0, offset: 1 }} />        
        <Form.Group controlId="Address"  bg={field} variant="dark" style ={field} align="right">
          <Form.Label>العنوان</Form.Label>
          <Form.Control type="Address" placeholder="ادخل العنوان" name="Address"  onChange = {this.handleChange.bind(this)}/>
        </Form.Group>
        </Row>

        <Row>
        <Form.Group controlId="birthdate"  bg={field} variant="dark" style ={field} align="right">
          <Form.Label> تاريخ الميلاد</Form.Label>
          <Form.Control type="date" placeholder="ادخل تاريخ الميلاد" name="birthdate"  onChange = {this.handleChange.bind(this)}/>
        </Form.Group>
        <Col md={{ span: 0, offset: 1 }} /> 
        <Form.Group controlId=" telephone_number" bg={field} variant="dark" style ={field} align="right">
          <Form.Label>"رقم المحمول</Form.Label>
          <Form.Control type="telephone_number" placeholder="ادخل رقم المحمول" name="telephone_number" onChange = {this.handleChange.bind(this)}/>
        </Form.Group>
        </Row>
        
        <Row>
        <Form.Group controlId="gender"  bg={field} variant="dark" style ={field} align="right">
          <Form.Label>الجنس</Form.Label>
        <Col md={{ span: 0, offset: 1 }}></Col>
        <input type="radio" name="gender" value="Male"  onChange={this.handleChange.bind(this)}/> ذكر &nbsp;
        <input type="radio" name="gender" value="Female"   onChange={this.handleChange.bind(this)}/> انثى
        </Form.Group>
        </Row>

        
        <Row style={{height: .05*window.innerHeight + 'px'}}>
        <Col md={{ span: 0, offset: 4 }}>
        <Button variant="primary" type="submit" onClick ={this.OnClick1.bind(this)} align="right">
          تأكييد
        </Button>
        </Col>        
        </Row>

        <Row style={{height: .1*window.innerHeight + 'px'}}></Row>
      </Form>
      </Col>
      
      </React.Fragment>
     
    )
  }
}

export default SignUp
