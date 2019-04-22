import React, { Component } from 'react';
import CaseCard from '../components/CaseCard'
import LawyerToolbar from '../components/LawyerToolbar'
import Spinner from 'react-bootstrap/Spinner'
import axios from 'axios'



class LawyerHome extends Component {

  state = {
      allCases: [],
      filteredCases: [],
      searchTerm: "",
      totalCases: 0,
      pressed: ''
  }

  componentDidMount() {

    console.log(this.state.allCases)
    try{
    axios({
      method: "get",
      url: 'http://localhost:3000/viewCasesLawyer' ,
      }).then(
          res => {
            let _allCases = res.data.data.filter((oneCase) => 
            {
              if(oneCase.english_name && oneCase.fees && oneCase.equality_capital && oneCase.log.length !== 0){
              return oneCase
            }})
            console.log('ALLCASES: ',_allCases)
            this.setState( {allCases: _allCases,totalCases: _allCases.length})
        }
    )
    }catch(error){
        console.log(error)
    }  
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      allCases: nextProps.allCases
    })};

  sortCards = (e) => {
      console.log(e.target.value)
      switch(e.target.value){
          case 'Name':
          this.setState({allCases: this.state.allCases.sort(function(a,b){var x = a.english_name.toLowerCase();
            var y = b.english_name.toLowerCase();
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;})})
          break;
          
          case 'Date':
          this.setState({allCases: this.state.allCases.sort(function(a,b){ return - new Date(a.log[0].date).getTime() + new Date(b.log[0].date).getTime()})});
          break;  

          case 'Capital':  
          this.setState({allCases: this.state.allCases.sort(function(a,b){return a.equality_capital - b.equality_capital})});
         break;     

         case 'Fees':
         this.setState({allCases: this.state.allCases.sort(function(a,b){return a.fees - b.fees})});
        break;

        default: break; 

      }
  };

  reMap(cases,filteredCases){
    if(this.state.searchTerm.length === 0){
      console.log('cases ===> ',cases)
      return cases.map( (oneCase) => 
         ( <CaseCard history={this.props.history} key={oneCase._id} case={oneCase} pressed={this.state.pressed} caseButton={this.caseButton.bind(this)} type='lawyer'/>))
    }
    else{
      console.log('filter')
      return filteredCases.map( (filteredCase) => 
      ( <CaseCard history={this.props.history} key={filteredCase._id} case={filteredCase} pressed={this.state.pressed} caseButton={this.caseButton.bind(this)} type='lawyer'/>) )
    }    
  }

  caseButton(caseID){
    console.log('inside case button, with caseID => ', caseID )
    this.setState({pressed: caseID})
    console.log('pressed::: ',this.state.pressed)
  }

  filter = (e) => {
      const original = this.state.allCases
      console.log(e.target.value)
      this.setState({searchTerm: e.target.value})
      if (e.target.value !== "") {
        this.setState({filteredCases: original.filter(oneCase => {
          if(oneCase.english_name){  
            const lc = oneCase.english_name.toLowerCase();
            const filter = e.target.value.toLowerCase();
            return lc.includes(filter);
          }
          else{
            return oneCase;
          }  
        })})
      }
    else{
        this.setState({allCases: original})
    }
} 

  render() {

    console.log(this.state.allCases)
    if(this.state.allCases.length !== 0){
    return (
        <div>
            <LawyerToolbar searchTerm={this.state.searchTerm} sortCards={this.sortCards} filter={this.filter} totalCases={this.state.totalCases}/>    
            {this.reMap(this.state.allCases,this.state.filteredCases)}
        </div>
    )
    }
    else{
      return(
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <Spinner  />
          </div>
        </div>
      )
    }
  }
}



// const styleCenterSpinner = {
//   position: "fixed",
//   width: 100,
//   height:100,
//   display: "flex",
//   alignItems: "center",
//   top: 0,
//   margin: 0
// }
export default LawyerHome;
