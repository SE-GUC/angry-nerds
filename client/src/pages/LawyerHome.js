import React, { Component } from 'react';
import CaseCard from '../components/CaseCard'
import LawyerToolbar from '../components/LawyerToolbar'

import axios from 'axios'



class LawyerHome extends Component {

  state = {
      allCases: [],
      searchTerm: "",
      sortTerm: "Name"
  }

  componentDidMount() {
    try{
    axios.get('http://localhost:3000/api/Cases').then(
          res => this.setState({allCases: res.data.data.sort(function(a,b){var x = a.english_name.toLowerCase();
                                                                            var y = b.english_name.toLowerCase();
                                                                            if (x < y) {return -1;}
                                                                            if (x > y) {return 1;}
                                                                            return 0;})})
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
          this.setState({allCases: this.state.allCases.sort(function(a,b){ return new Date(a.caseOpenSince).getTime() - new Date(b.caseOpenSince).getTime()})});
          break;  

          case 'Capital':  
          this.setState({allCases: this.state.allCases.sort(function(a,b){ console.log(a.fees - b.fees); return a.equality_capital - b.equality_capital})});
         break;     

         case 'Fees':
         this.setState({allCases: this.state.allCases.sort(function(a,b){ console.log(a.fees - b.fees); return a.equality_capital - b.equality_capital})});
        break;

      }
  };

  reMap(){
      return this.state.allCases.map( (oneCase) => 
        ( <CaseCard key={oneCase._id} case={oneCase}/>) )
  }

  filter = (e) => {
      const original = this.state.allCases
      console.log(e.target.value)
      if (e.target.value !== "") {
      this.setState({allCases: this.state.allCases.filter(oneCase => {
      const lc = oneCase.english_name.toLowerCase();
      const filter = e.target.value.toLowerCase();
      return lc.includes(filter);
      })})
    }
    else{
        this.setState({allCases: original})
    }
}

  render() {
    return (
        <div>
            <LawyerToolbar searchTerm={this.state.searchTerm} sortCards={this.sortCards} filter={this.filter}/>    
            {this.reMap()}
        </div>
    );
  }
}

export default LawyerHome;
