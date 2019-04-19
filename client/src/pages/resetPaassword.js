import React ,{ Component } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'; 
import Alert from 'react-bootstrap/Alert'; 
import axios from 'axios';
import { Row , Col } from 'react-bootstrap';
import '../App.css'
import Verifypassword from "../components/password"
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
        <React.Fragment>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css"/>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
        <Form>
            <br>
            </br>
            <fieldset class="the-fieldset">
            <legend  class="the-legend" >Reset Password</legend>
            <div className="container">
            <Row>
            <Col  md={{ span: 4, offset: 4 }}>
            <div className="col-xs-12">
            <Verifypassword />
            </div></Col>
            </Row>
            <Row>
            <Col  md={{ span: 4, offset: 5 }}>
            <Button variant="primary" type="submit" onClick={this.submit.bind(this)}>
                Confirm
            </Button>
            </Col>
            </Row>
            </div>
            </fieldset>
    </Form>
    </React.Fragment>    
  )
  
}
}


export default Resetpass;