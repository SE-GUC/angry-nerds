import React, { Component } from 'react';
import CaseCard from '../components/CaseCard'

import Spinner from 'react-bootstrap/Spinner'

import axios from 'axios'



class InvestorSearch extends Component {

  state = {
      allInvestors: [],
      filteredInvestors: [],
      searchTerm: "",
      totalInvestors: 0
  }
 
  componentDidMount() {

    try{
    axios.get('http://localhost:3000/api/Investor').then(
          res => this.setState(
            {
              allInvestors: res.data.data.filter((oneInvestor) => 
            {console.log(oneInvestor)
              if(oneInvestor.firstName && oneInvestor.middleName && oneInvestor.equality_capital && oneInvestor.log.length !== 0){
              return oneInvestor
            }}), 
            
            totalCases: res.data.data.filter((oneInvestor) => 
            {console.log(oneInvestor)
              if(oneInvestor.english_name && oneInvestor.fees && oneInvestor.equality_capital && oneInvestor.log.length !== 0){
              return oneInvestor
            }}).length
          })
    )
    }catch(error){
        console.log(error)
    }  
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      allInvestors: nextProps.allInvestors
    })};

  sortCards = (e) => {
      console.log(e.target.value)
      switch(e.target.value){
          case 'Name':
          this.setState({allInvestors: this.state.allInvestors.sort(function(a,b){var x = a.english_name.toLowerCase();
            var y = b.english_name.toLowerCase();
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;})})
          break;
          
          case 'Date':
          this.setState({allInvestors: this.state.allInvestors.sort(function(a,b){ return - new Date(a.log[0].date).getTime() + new Date(b.log[0].date).getTime()})});
          break;  

          case 'Capital':  
          this.setState({allInvestors: this.state.allInvestors.sort(function(a,b){return a.equality_capital - b.equality_capital})});
         break;     

         case 'Fees':
         this.setState({allInvestors: this.state.allInvestors.sort(function(a,b){return a.fees - b.fees})});
        break;

        default: break; 

      }
  };

  reMap(cases,filteredCases){
    if(this.state.searchTerm.length === 0){
      console.log('cases ===> ',cases)
      return cases.map( (oneInvestor) => 
         ( <CaseCard key={oneInvestor._id} case={oneInvestor}/> ))
    }
    else{
      console.log('filter')
      return filteredCases.map( (filteredCase) => 
      ( <CaseCard key={filteredCase._id} case={filteredCase}/>) )
    }    
  }

  filter = (e) => {
      const original = this.state.allInvestors
      console.log(e.target.value)
      this.setState({searchTerm: e.target.value})
      if (e.target.value !== "") {
        this.setState({filteredCases: original.filter(oneInvestor => {
          if(oneInvestor.english_name){  
            const lc = oneInvestor.english_name.toLowerCase();
            const filter = e.target.value.toLowerCase();
            return lc.includes(filter);
          }
          else{
            return oneInvestor;
          }  
        })})
      }
    else{
        this.setState({allInvestors: original})
    }
}

  render() {

    
    if(this.state.allInvestors.length !== 0){
    return (
        <div>
            <LawyerToolbar searchTerm={this.state.searchTerm} sortCards={this.sortCards} filter={this.filter} totalCases={this.state.totalCases}/>    
            {this.reMap(this.state.allInvestors,this.state.filteredCases)}
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

export default InvestorSearch;