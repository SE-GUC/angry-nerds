import React, { Component } from 'react';
import axios from 'axios'
import AnswerDeleteQuestion from '../components/AnswerDeleteQuestion'
import {Input, Form, Label, Button} from 'reactstrap'




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
        axios.get('http://localhost:3000/UnregisteredViewQuestions').then(
              res => this.setState({allQuestions: res.data.data}))
        
        
        }catch(error){
            console.log(error)
        }  
      }

      

  searchText(event){
    this.setState({
      search: event.target.value
    })
    console.log(this.state.search)
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


  filter = (e) => {
      const original = this.state.allQuestions
      console.log(e.target.value)
      this.setState({search: e.target.value})
      if (e.target.value !== "") {
        this.setState({filteredQuestions: original.filter(aquestion => {
          if(aquestion.question){  
            const lc = aquestion.question.toLowerCase();
            const filter = e.target.value.toLowerCase();
            return lc.includes(filter);
          }
          else{
            return aquestion;
          }  
        })})
      }
    else{
        this.setState({allQuestions: original})
    }
} 



  render() {

    
    
    return (
        <div>
            <Form>

<Label>Search</Label>

<Input type="text" placeholder="Find Question..." onChange={this.filter.bind(this)}> Search... </Input>
{/* <button type="button" class="btn btn-outline-primary" onClick={this.filter.bind(this)}> Search </button> */}

 </Form>
            {this.TheQuestions(this.state.allQuestions,this.state.filteredQuestions)}
        </div>
    )
    }
    


//return(  <AnswerDeleteQuestion/>)

  }





export default AdminAnswerDeleteQuestion;

