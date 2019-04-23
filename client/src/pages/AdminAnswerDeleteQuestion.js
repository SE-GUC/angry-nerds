import React, { Component } from 'react';
import axios from 'axios'
import AnswerDeleteQuestion from '../components/AnswerDeleteQuestion'
import {Input, Form, Label} from 'reactstrap'




class AdminAnswerDeleteQuestion extends Component {
    

  state = {
      allQuestions: [],
      search: "",
      clicked: '',
      toanswer:'',
      filteredQuestions: []
  }

  componentDidMount() {

    console.log(this.state.allCases)
    try{
        axios.get('http://localhost:3000/api/Questions').then(
              res => this.setState({allQuestions: res.data.data}))
        
        
        }catch(error){
            console.log(error)
        }  
      }

      

  filter(event){
    this.setState({
      search: event.target.value
    })
    let thesearch = event.target.value.replace(/\s/g,'').toLowerCase()
    console.log(thesearch)
      this.setState({
        filteredQuestions: this.state.allQuestions.filter(aquestion => {
          let name = (aquestion.question).toLowerCase();
          console.log(name);
          if (name.includes(thesearch)) return aquestion;
        })
      });


  }

  

  TheQuestions(questions,searchquestions){
    if(this.state.search.length === 0){
      return questions.map( (aquestion) => 
         ( <AnswerDeleteQuestion key={aquestion._id} question={aquestion} clicked={this.state.clicked} toanswer={this.state.toanswer} questionButton={this.questionButton.bind(this)}/> ))
    }
    else{
      return searchquestions.map( (asearchquestion) => 
      ( <AnswerDeleteQuestion key={asearchquestion._id} question={asearchquestion} clicked={this.state.clicked} toanswer={this.state.toanswer} questionButton={this.questionButton.bind(this)} />) )
    }    
  }

  questionButton(quesID){
    this.setState({clicked: quesID,toanswer:quesID})
  }




  render() {

    
    
    return (
        <div>
            <Form>

<Label>Search</Label>

<Input type="text" placeholder="Find Question..." onChange={this.filter.bind(this)}> Search... </Input>
{this.TheQuestions(this.state.allQuestions,this.state.filteredQuestions)}
 </Form>
            
        </div>
    )
    }
    


  }





export default AdminAnswerDeleteQuestion;

