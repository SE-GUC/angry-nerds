import React, { Component } from 'react';

import {Input, Form, Label} from 'reactstrap'

import axios from 'axios'
import MiniJournal from '../components/miniJournal';



class electronicJournal extends Component {

  state = {
      companies: [],
      filteredCompanies: [],
      searchTerm: "",
      companyCount: 0,
      clicked: ''
  }

  componentDidMount() {
    try{
    axios.get('http://localhost:3000/api/Cases').then(
          res =>{
            this.setState({companies: res.data.data})
          } )
          
    
    }catch(error){
        console.log(error)
    }  
  }


  theCompanies(companies,filteredCompanies){
    if(this.state.searchTerm.length === 0){
      return companies.map( (aComp) => 
         ( <MiniJournal key={aComp._id} comp={aComp} clicked={this.state.clicked} compButton={this.compButton.bind(this)} /> ))
    }
    else{
      console.log('filter')
      return filteredCompanies.map( (aSerchComp) => 
      ( <MiniJournal key={aSerchComp._id} comp={aSerchComp} clicked={this.state.clicked} compButton={this.compButton.bind(this)} />) )
    }    
  }

  compButton(compID){
    this.setState({clicked: compID})
  }

  filter = (e) => {
      const original = this.state.companies
      console.log(e.target.value)
      this.setState({searchTerm: e.target.value})
      if (e.target.value !== "") {
        this.setState({filteredCompanies: original.filter(aComp => {
          if(aComp.english_name){  
            const lc = aComp.english_name.toLowerCase();
            const filter = e.target.value.toLowerCase();
            return lc.includes(filter);
          }
          else{
            return aComp;
          }  
        })})
      }
    else{
        this.setState({companies: original})
    }
} 

  render() {

    
    return (
     // <MiniJournal/>
        <div>
          <Form>
          <Label>Search</Label>

<Input type="text" placeholder="Find Question..." onChange={this.filter.bind(this)}> Search... </Input>
            {this.theCompanies(this.state.companies,this.state.filteredCompanies)}
            </Form>
        </div>  
    )
    }
    
}




export default electronicJournal;
