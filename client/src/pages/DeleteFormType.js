import React, { Component } from "react";
import Axios from "axios";
import {Input, Form, Label, Button} from 'reactstrap'
import DeleteFormTypeItem from '../components/DeleteFormTypeItem'

export class DeleteFormType extends Component {
  
    state = {
    forms: [],
    filteredForms:[],
    searchTerm: ''
  };

  constructor(props) {
    super(props);

    try{

      Axios.get("http://localhost:3000/AdminFindFormType").then(Forms => {

        this.setState({
          forms: Forms.data.data,
          filteredForms: JSON.parse(JSON.stringify(Forms.data.data))
        }) 

        console.log(this.state)

      })


    }
    catch(e){
      console.log(e)
    }
  }

    
  searchText(event){
    this.setState({
      searchTerm: event.target.value
    })
    console.log(this.state.searchTerm)
  }

  filter(event){
    this.setState({
      searchTerm: event.target.value
    })
    let search = event.target.value.replace(/\s/g,'').toLowerCase()
    console.log(search)
      this.setState({
        filteredForms: this.state.forms.filter(form => {
          let name = (form.formName).toLowerCase();
          console.log(name);
          if (name.includes(search)) return form;
        })
      });


  }

  remap(form) {
    let list = form.map(l => {
      console.log(l);
      return <h1> {l.formName} </h1>;
    });
    return list;
  }
 
  render() {

    if(this.state.forms.length !== 0){
    return (
      <div>
        <div >
          <br></br>
          
          <Form>

            <Label>Search</Label>
            
        <Input type="text" placeholder="Find Form types..." onChange={this.filter.bind(this)}> Search... </Input>
        {/* <button type="button" class="btn btn-outline-primary" onClick={this.filter.bind(this)}> Search </button> */}
       
        </Form>
        <br></br>
        <br></br>
        </div>
        {this.state.filteredForms.map(form => {
          return (<div>
            <DeleteFormTypeItem form={form} NewRefresh = {this.NewRefresh}/>
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
</div>);
      }
  }
}

export default DeleteFormType;