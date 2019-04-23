import React, { Component } from "react";
import axios from 'axios'
import Card from "react-bootstrap/Card"; 
import Button from "react-bootstrap/Button";
import Table from 'react-bootstrap/Table'
import { Collapse } from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'


class AnswerDeleteQuestion extends Component {
    
    state={
        open: {},
        tempQues: this.props.question
    }

    
  
    /*openCase(e) {
      e.preventDefault()
      
      console.log('before  ==> ',this.props.clicked)
      this.props.caseButton(this.props.question._id)
      console.log('after  ==> ',this.props.clicked)
      let path 
        path = 'http://localhost:3000/AdminDeleteQuestion/' + this.props.question._id 
      
      try{
        console.log('eeeeeeeeennnnnnnnntttttttttteeeeeeeeeeeerrrrrrrrrrrrrreeeeeeeeeeeedddddddddd')
      axios.delete(path).then(res => console.log(res))}
      catch(e){
        console.log(e)
      }
      //this.props.history.push('lawyerOpenCase/' + oneCase._id);
    }*/


    deleteQuestion(e){
       // console.log(this.props.question._id)
        axios({
            method: 'delete',
            url:'http://localhost:3000/AdminDeleteQuestion/'+this.props.question._id,
            headers: {}, 
            data: { 
            }
          });
          alert('Successfully deleted')
          this.render()
        
    }

  


    buttonDelete = (aquestion) => {
      return(
          <div>
          <Button onClick={this.deleteQuestion.bind(this)} className="float-right"
            style ={{backgroundColor:'#286090',border:'#286090'}}>
            Delete Question
          </Button>
          </div>
  
        )
      }


      answerQuestion(e){
        console.log(this.props.question._id)
        axios({
            method: 'put',
            url:'http://localhost:3000/AdminAnswerQuestions'+this.props.question._id,
            headers: {}, 
            data: { 
            
            }
          });
          //alert('Successfully answered')
          this.render()
        
    }

  


    buttonAnswer = (aquestion) => {
      console.log(this.props.toanswer)
      if(this.props.toanswer !== null && this.props.toanswer === aquestion._id){
        console.log('LOCK-LOCK-LOCK')
      }
        return(
          <div>
          <Button onClick={this.answerQuestion.bind(this)} className="float-right"
            style ={{backgroundColor:'#286090',border:'#286090'}}>
            Answer Question
          </Button>
          </div>
  
        )
      }
    


      showAnswerField(field) {
    
        return(
          <Collapse in={this.state.open[field.key]}>
          <div id={"control" + field.key}>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-sm" style={{color: "#286090"}}>Answer Question:</InputGroup.Text> 
            </InputGroup.Prepend>
            <FormControl  onChange={(e) => {this.addAnswer(e,field)}} style={{color: "#286090"}} aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
            <Button style ={{backgroundColor:'#286090',border:'#286090'}} onClick={()=>{axios({
          method: 'PUT',
          url: 'http://localhost:3000/AdminAnswerQuestions/'+ this.props.question._id ,
         /* headers: {
            'Authorization':localStorage.getItem('jwtToken'),
            'Content-Type' : 'application/json',
            'Accept' : 'application/json' 
          },*/
          data: {
            answer : this.state.tempQues.undefined
          }
          }).then(res => console.log('Done',res))
            .catch(error => console.log(error))
            
            alert('Successfully answered')
            this.render() }
            }> Done</Button>
          </InputGroup>
          </div>
        </Collapse>
        )
      }

    

      addAnswer(e,field){
        console.log('target : ',e.target.value,' field : ',this.state.tempQues.answer, ' test: ',this.state.tempQues)
        
        let newAnswer = this.state.tempQues
        newAnswer[field.key] = e.target.value
        console.log(field)
        console.log(field.key)
        console.log(field.answer)


        console.log(newAnswer)

        this.setState({tempQues: newAnswer})
        console.log(this.state.tempQues.undefined)

        console.log(this.state.tempQues)
        console.log(this.state.tempQues.answer)
        console.log(this.state.tempQues.undefined)



        
      

      }
  
    
  
  
    render() {
      return (
  
        <div className="p-1" >
          <Card >
            <Card.Header>
            <div className="float-left">{this.props.question.question}</div>    
            </Card.Header>
  
            <Card.Body>
              <div className="ml-auto p-2 bd-highlight">
                <Card.Text className="float-left" style ={{textAlign:"left"}}>

                  
                  <Table style={{tableLayout:'fixed'}}>
                      <tr >
                          <td style={{width:'80%'}}><div style={{color:'#286090'}}>Answer:</div> {this.props.question.answer}</td>
                          <td><tr><td>{this.buttonDelete(this.props.question)}</td></tr>
                          <tr><div className="p-2 flex-shrink-1 bd-highlight">
            <Form.Label style={{color: "white"}}>`</Form.Label> 
            <Button style ={{backgroundColor:'#286090',border:'#286090'}} value={this.props.question.key} onClick={(e) => { e.preventDefault(); let c = this.state.open; c[this.props.question.key] = !c[this.props.question.key]; this.setState({open: c})}  }
          aria-controls={"control" + this.props.question.key}
          aria-expanded={this.state.open[this.props.question.key]} >Answer Question</Button>
          </div></tr></td>


          </tr>

                  </Table>
                  </Card.Text>
                  
    
    
                     
              </div>
            </Card.Body>
            <Card.Footer>
            <small className="mb-2">
            {this.showAnswerField(this.props.question)}

              
            </small>
          </Card.Footer>
  
          </Card>
        </div>
      );
      }
    }
  
  
  export default AnswerDeleteQuestion;

  