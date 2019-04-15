import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import axios from 'axios'
import './Questions.css';
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Nav from 'react-bootstrap/Nav'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'



class Questions extends Component {

    state = {
      questions: [],
      senderEmail:"",
      senderQuestion:""
    }

    componentDidMount() {
        try{
        axios.get('http://localhost:3000/UnregisteredViewQuestions').then(
              res => this.setState({questions: res.data.data}))
        
        
        }catch(error){
            console.log(error)
        }  
      }

      handleUserInput = (e) => {
         this.setState({[e.target.name]:e.target.value})
       }


       methodcall() {
        axios({
          method: 'POST',
          url:'http://localhost:3000/MakeQuestion',
          headers : new Headers(),
          data:{
            question: this.state.senderQuestion,
            email: this.state.senderEmail
          }
      }).then((res) => res.json())
      .then((data) =>  console.log(data))
      .catch((err)=>console.log(err))


            

        }



    
render(){
    return(
        <React.Fragment> 
        <Card > 
        <Card.Header className="cardHeader"><Nav variant="tabs" defaultActiveKey="#first">
      <Nav.Item>
        <Nav.Link href="#first" className="navText">View All Questions</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#link" className="navText">Ask A Question</Nav.Link>
      </Nav.Item>
    </Nav></Card.Header> 

      <div id="questionPart">  {this.state.questions.map( (question) =>(<ListGroup variant="flush" className='listGroup' id="first">
    <ListGroup.Item className='listItem'>Q:  {question.question}</ListGroup.Item>
    <ListGroup.Item className='listItem'>Ans:  {question.answer}</ListGroup.Item>
    </ListGroup>))} </div>

    <p></p>
    <h2>Don't Hesitate To Leave Your Question and We'll Answer You As Soon As Possible </h2>
 

  <div id="link" style={{ backgroundColor: '#e6f3ff'}}>
    <InputGroup className="mb-3" >
      <FormControl
        placeholder="Enter your question" name='senderQuestion' onChange={this.handleUserInput.bind(this)}
      />
      <InputGroup.Append>
        <InputGroup.Text>?</InputGroup.Text><Button variant="primary" type="submit"  onClick={this.methodcall.bind(this)}>Submit</Button>
      </InputGroup.Append>
      </InputGroup>
      <InputGroup className="mb-3" >
      <FormControl
        placeholder="Enter your Email"  name='senderEmail' onChange={this.handleUserInput.bind(this)} /></InputGroup> </div>
      
      
    
          </Card>

          
          
        
        </React.Fragment>
        
      
  
     

  
     




        

    
    )
}

}

export default Questions