import React, { Component } from "react";
import Axios from "axios";
import InvestorItem from '../components/InvestorItem'
import {Input, Form, Label, Button} from 'reactstrap'

export class InvestorsList extends Component {
  state = {
    investors: [],
    filteredInvestors:[],
    searchTerm: ''
  };

  constructor(props) {
    super(props);

    try {
      Axios.get("http://localhost:3000/api/Investor").then(investors => {
        this.setState({
          investors: investors.data.filter((inv)=> {
            console.log(inv)
            if(inv.firstName && inv.LastName)
              return inv
          })
        });
        this.setState({filteredInvestors: this.state.investors})
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
        filteredInvestors: this.state.investors.filter(inv => {
          let name = (inv.firstName + inv.LastName).toLowerCase();
          console.log(name);
          if (name.includes(search)) return inv;
        })
      });


  }

  remap(inv) {
    let list = inv.map(Investor => {
      console.log(Investor);
      return <h1> {Investor.firstName} </h1>;
    });
    return list;
  }

  render() {
    return (
      <div>
        <div >
          <br></br>
          
          <Form>

            <Label>Search</Label>
            
        <Input type="text" placeholder="Find Investor..." onChange={this.filter.bind(this)}> Search... </Input>
        {/* <button type="button" class="btn btn-outline-primary" onClick={this.filter.bind(this)}> Search </button> */}
       
        </Form>
        <br></br>
        <br></br>
        </div>
        {this.state.filteredInvestors.map(Investor => {
          return (<div>
            <InvestorItem inv={Investor}/>
            <br/>
            </div>)

        })}
      </div>
    );
  }
}

export default InvestorsList;
