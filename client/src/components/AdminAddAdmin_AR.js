import React, { Component } from 'react'
import {Button,Form,Col,Modal} from 'react-bootstrap';
import axios from 'axios';

export class AdminAddAdmin_AR extends Component {
    setstate = {
        FName: '',
        MName: '',
        LName: '',
        email: '',
        password: '',
        gender: '',
        Nationality: '',
        birthdate: '',
        Address: '',
        telephone_number: '',
        completed_number_of_cases :'0',
        number_of_cases: '0' ,
        total_time_on_cases: '0' ,
        fax: '',
        ssid:''
      }
    
      handleChangeFName = event => {
        this.setState({ FName: event.target.value});                                
      }
    
      handleChangeMName = event => {
        this.setState({ MName: event.target.value});                                
      }
      handleChangeLName = event => {
        this.setState({ LName: event.target.value});                                
      }
    
      handleChangeEmail = event => {
        this.setState({ email: event.target.value});                                
      }
      handleChangePassword = event => {
        this.setState({ password: event.target.value});                                
      }
    
      handleChangeGender = event => {
        this.setState({ gender: event.target.value});                                
      }
      handleChangrNationality = event => {
        this.setState({ Nationality: event.target.value});                                
      }
      handleChangebirthdate = event => {
        this.setState({ birthdate: event.target.value});                                
      }
    
      handleChangegAddress = event => {
        this.setState({ Address: event.target.value});                                
      }
      handleChangegtelephone_number = event => {
        this.setState({ telephone_number: event.target.value});                                
      }
    
      handleChangegfax = event => {
        this.setState({ fax: event.target.value});                                
      }
    
      handleChangegssid = event => {
        this.setState({ ssid: event.target.value});                                
      }
    
      
    
      handleSubmit = event => {
        event.preventDefault();
    
        const user = {
          FName: this.state.FName,
          MName: this.state.MName,
          LName: this.state.LName,
          email: this.state.email,
          password: this.state.password,
          gender: this.state.gender,
          Nationality: this.state.Nationality,
          birthdate: this.state.birthdate,
          Address: this.state.Address,
          telephone_number: this.state.telephone_number,
          fax: this.state.fax,
          completed_number_of_cases: '0',
          total_time_on_cases: '0',
          number_of_cases: '0' ,
          ssid: this.state.ssid,
    
    
    
         };
    
         try {
        axios.post(`http://localhost:3000/AdminRegisterAdmin`,  user )
          .then(res => {
            console.log(res);
            console.log(res.data);
          }) }
          catch(e){
            console.log(e)
          }
    
      }
      
      render() {
        return (
            <Form onSubmit={this.handleSubmit}>

            <Form.Row>
      
                <Form.Group as={Col} text-align="right" controlId="formGridPassword">
            <Form.Label float="right">كلمه السر</Form.Label>
            <Form.Control type="text"  name="password" placeholder="كلمه السر"  onChange={this.handleChangePassword}/>
          </Form.Group>   
          
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label> البريد الإلكتروني</Form.Label>
            <Form.Control type="email" name="email" placeholder="البريد الإلكتروني"  onChange={this.handleChangeEmail}/>
          </Form.Group>
      
          
        </Form.Row>
      
             <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>اسمك</Form.Label>
            <Form.Control type="text"  name="FName"   placeholder="اسمك"  onChange={this.handleChangeFName}/>
          </Form.Group>
      
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>اسم الأب </Form.Label>
            <Form.Control type="text"  name="MName" placeholder="اسم الأب"  onChange={this.handleChangeMName}/>
          </Form.Group>
      
             <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>اسم العائلة</Form.Label>
            <Form.Control type="text" name="LName" placeholder="اسم العائلة"  onChange={this.handleChangeLName}/>
          </Form.Group>
      
        </Form.Row>
      
        <Form.Row> 
      
        <Form.Group as ={Col} controlId="formGridAddress1">
          <Form.Label>العنوان</Form.Label>
          <Form.Control  name="Address"  onChange={this.handleChangegAddress} />
        </Form.Group>
      
        <Form.Group as={Col} controlId="formGridAddress1">
          <Form.Label >  رقم الهاتف  </Form.Label>
          <Form.Control name="telephone_number" onChange={this.handleChangegtelephone_number} />
        </Form.Group>
        </Form.Row>
      
        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>الجنسية</Form.Label>
            <Form.Control name="Nationality" onChange={this.handleChangrNationality} />
          </Form.Group>
      
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>الجنس</Form.Label>
            <Form.Control as="select"  name="Gender" onChange={this.handleChangeGender}   >
              <option>...</option>
              <option>أنثى</option>
              <option>ذكر</option>
      
            </Form.Control>
          </Form.Group>
      
          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>تاريخ الولادة</Form.Label>
            <Form.Control type = "date"  name="BithDate" onChange={this.handleChangebirthdate}/>
          </Form.Group>
        </Form.Row>
      
           <Form.Row>
      
      <Form.Group as={Col} controlId="formGridZip">
      <Form.Label>الفاكس</Form.Label>
      <Form.Control type = "text"  name="fax" onChange={this.handleChangegfax}/>
      </Form.Group>
      
      <Form.Group as ={Col} controlId="formGridZip">
      <Form.Label>الرقم القومي</Form.Label>
      <Form.Control type = "text"  name="fax" onChange={this.handleChangegssid}/>
      </Form.Group>
      
      
      
      
      </Form.Row>
      
      
      
      
             <Button variant="outline-secondary"  type="submit"  >Submit</Button>
      
            </Form>

          
        );
      }
      
    }
export default AdminAddAdmin_AR
