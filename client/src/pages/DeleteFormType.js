import React, { Component } from "react";
import Axios from "axios";
import {Input, Form, Label, Button} from 'reactstrap'
import DeleteFormTypeItem from '../components/DeleteFormTypeItem'

export class DeleteFormType extends Component {
  
    state = {
    laws: [],
    filteredLaws:[],
    searchTerm: ''
  };

  constructor(props) {
    super(props);

    try {
      Axios.get("http://localhost:3000/AdminFindFormType").then(law => {
        this.setState({
          laws: law.data.filter((l)=> {
            console.log(l)
            
              return l
          })
        });
        this.setState({filteredLaws: this.state.laws})
      });
    } catch (e) {
      console.log(e);
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
        filteredLaws: this.state.laws.filter(law => {
          let name = (law.LawNumber).toLowerCase();
          console.log(name);
          if (name.includes(search)) return law;
        })
      });


  }

  remap(law) {
    let list = law.map(l => {
      console.log(l);
      return <h1> {l.LawNumber} </h1>;
    });
    return list;
  }
 
  render() {

    if(this.state.laws.length !== 0){
    return (
      <div>
        <div >
          <br></br>
          
          <Form>

            <Label>Search</Label>
            
        <Input type="text" placeholder="Find Laws..." onChange={this.filter.bind(this)}> Search... </Input>
        {/* <button type="button" class="btn btn-outline-primary" onClick={this.filter.bind(this)}> Search </button> */}
       
        </Form>
        <br></br>
        <br></br>
        </div>
        {this.state.filteredLaws.map(law => {
          return (<div>
            <DeleteFormTypeItem law={law} NewRefresh = {this.NewRefresh}/>
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