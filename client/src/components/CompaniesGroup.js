import React, { Component } from "react";
import Axios from "axios";
import {Input, Form, Label, Button} from 'reactstrap'
import CompanyItem from './CompanyItem'

export class ComapniesGroup extends Component {
  state = {
    Companies: [],
    filteredCompanies:[],
    searchTerm: ''
  };

  constructor(props) {
    super(props);

    try {
        Axios.get("http://localhost:3000/api/Cases").then(Companies => {
        this.setState({
          Companies: Companies.data.data.filter((Ncase)=> {
            if(Ncase.caseStatus&&Ncase.form_type&&Ncase.arabic_name&&Ncase.english_name)
            {
              return Ncase
            } 
          })
        });
        this.setState({
          filteredCompanies: this.state.Companies
        })
        console.log('hena')
        console.log(this.state.Companies)
  
    });

 
    
    } catch (e) {
      console.log(e);
    }
  }

  searchText(event){
    this.setState({
      searchTerm: event.target.value
    })
  }

  filter(event){
    this.setState({
      searchTerm: event.target.value
    })
    let search = event.target.value.replace(/\s/g,'')
      this.setState({
        filteredCompanies: this.state.Companies.filter(Ncase => {
          let name = (Ncase.arabic_name + Ncase.english_name)
          if (name.includes(search)) return Ncase;
        })
      });


  }
 
  render() {

    if(this.state.Companies.length !== 0){
    return (
      <div>
        <div >
          <br></br>
          
          <Form>

            <Label>Search</Label>
            
        <Input type="text" placeholder="Find company..." onChange={this.filter.bind(this)}> Search... </Input>
        {/* <button type="button" class="btn btn-outline-primary" onClick={this.filter.bind(this)}> Search </button> */}
       
        </Form>
        <br></br>
        <br></br>
        </div>
        {this.state.filteredCompanies.map(Companies => {
          return (<div>
            <CompanyItem company={Companies} NewRefresh = {this.NewRefresh}/>
            <br/>
            </div>)

        })}
      </div>
    );
      }
      else
      {
        return (
          <div className="d-flex justify-content-center">
        <div class="spinner-border text-black" role="status">
        <span class="sr-only">Loading...</span>
        </div>
        </div>
        );
      }
  }
}

export default ComapniesGroup;