import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

export class AdminViewLaws extends Component {

  state = {
    allLaws: [],
  }

  componentDidMount() {
    try{
    axios.get('http://localhost:3000/UserViewLaws').then(
          res => this.setState({allLaws: res.data.data}))
    
    
    }catch(error){
        console.log(error)
    }  
  }



  render() {
    return (
      <div>
        <Table striped bordered hover>
  <thead>
    <tr>
      <th>Law Number</th>
      <th>Law Entity</th>
      <th>Law Value </th>
      <th>Law Calc</th>
      <th>Min</th>
      <th>Max</th>
      <th>Description</th>
      <th>Edit</th>
    </tr>
  </thead>
  <tbody>
    {this.state.allLaws.map( (oneLaw) => 
        ( <tr> <td>{oneLaw.LawNumber}</td>
        <td>{oneLaw.LawEntity}</td>
        <td>{oneLaw.LawValue}</td>
        <td>{oneLaw.LawCalc}</td>
        <td>{oneLaw.min}</td>
        <td>{oneLaw.max}</td>
        <td>{oneLaw.description}</td>
        <td> <Button variant="outline-secondary">Edit Law</Button></td>
         </tr>)) }
    
  </tbody>
</Table>;
      </div>
    )
  }
}

export default AdminViewLaws
