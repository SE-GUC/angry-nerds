import React ,{ Component } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'; 
import Alert from 'react-bootstrap/Alert'; 
import axios from 'axios';
import { Row , Col , Container } from 'react-bootstrap';
import '../App.css'
import Verifypassword from "../components/passwordinReset"
const padding = {margin: '20'};

class Resetpass extends Component  {
    state={

    }

    async submit (event){
        // event.preventDefault();
        // var spassword = document.getElementById('password').value
        // try{
        // await axios.get('http://localhost:3000/changepassword/'+spassword)
        // alert("Successfully")
        // }
        // catch(error)
        // {
        //   alert("Incorrect password")
        // }
    }
    render(){
    return (
            <Container>
                
            <br></br>
            <legend >Reset Password</legend>            
            <Row>
            <Col md={{ span: 6, offset: 3 }}>
            <Verifypassword />
            </Col>
            </Row>
            <Row>
            <Col  md={{ span: 4, offset: 5 }}>
            <Button variant="primary" type="submit" onClick={this.submit.bind(this)}>
                Confirm
            </Button>
            </Col>
            </Row>
            </Container>
  )
  
}
}


export default Resetpass;