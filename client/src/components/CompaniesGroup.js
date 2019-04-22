import React, { Component } from "react";
import Axios from "axios";
import {Input, Form, Label, Button} from 'reactstrap'
import CompanyItem from './CompanyItem'

export class ComapniesGroup extends Component {
  state = {
    PublishedCompanies:[],
    PendingCompanies:[],
    Companies: [],
    filteredCompanies:[],
    searchTerm: ''
  };

  constructor(props) {
    super(props);

    try {
        Axios.get("http://localhost:3000/ViewMyPublishedCompanies").then(PublishedCompanies => {
          console.log('hi')
          console.log(PublishedCompanies.data)
        this.setState({
            PublishedCompanies: PublishedCompanies.data.data.filter((Ncase)=> {
              console.log('Gadeda')
              console.log(Ncase)
            if(Ncase.caseStatus&&Ncase.form_type&&Ncase.arabic_name&&Ncase.english_name)
              return Ncase
              
          })
        });
        Axios.get("http://localhost:3000/viewMyPendingCompanies").then(PendingCompanies => {
          console.log('hi')
            console.log(PendingCompanies.data.data)
          this.setState({
              PendingCompanies: PendingCompanies.data.data.filter((Ncase)=> {
              if(Ncase.caseStatus&& Ncase.form_type&&Ncase.arabic_name&&Ncase.english_name)
                return Ncase
            })
          });
          let Total = [];
        console.log('Concat 1')
        console.log(this.state.PublishedCompanies)
        console.log('Concat 1')
        console.log(this.state.PendingCompanies)
        Total =Total.concat(this.state.PublishedCompanies);
        Total=Total.concat(this.state.PendingCompanies);
        console.log('Concat')
        console.log(Total)
        this.setState({Companies:Total})
        this.setState({filteredCompanies:Total})
  
      });
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
            
        <Input type="text" placeholder="Find your company..." onChange={this.filter.bind(this)}> Search... </Input>
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
        <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
        </div>
        );
      }
  }
}

export default ComapniesGroup;