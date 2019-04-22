import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";

export class AdminViewLaws extends Component {
  state = {
    allLaws: []
  };

  componentDidMount() {
    try {
      axios
        .get("http://localhost:3000/UserViewLaws")
        .then(res => this.setState({ allLaws: res.data.data.filter(law => {
          if(law.fixedValues.length !== 0 && law.percentages.length !== 0){
            return law
          }
        }
        ) }));
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        {this.state.allLaws.map(law => {
          console.log(law.LawNumber)
          return (
            <div>
                      <div> &nbsp;&nbsp;</div> 

              <div class="d-flex">
              <h3 className='p-2'>Law {law.LawNumber}</h3>
              <Button className='ml-auto p-2' variant='light' onClick={(e) => {e.preventDefault(); this.props.history.push({pathname: 'AdminEditLaws/' + law._id, state: {law: law}});}} >Edit Law</Button>
              </div>
              <h5>Fixed Values</h5>
              <Table striped bordered hover variant='dark'>
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {law.fixedValues.map(fixedValue => {
                    return(
                    <tr>
                      <td>{fixedValue.description}</td>
                      <td>{fixedValue.value}</td>
                    </tr>
                    )
                  })}
                </tbody>
              </Table>
              <h5>Percentages</h5>
              <Table striped bordered hover variant='dark'>
                <thead>
                  <tr>
                    <th>Value</th>
                    <th>Minimum</th>
                    <th>Maximum</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {law.percentages.map(percentage => {
                    return(
                    <tr>
                      <td>{percentage.value}</td>
                      <td>{percentage.min}</td>
                      <td>{percentage.max}</td>
                      <td>{percentage.description}</td>
                    </tr>
                    )
                  })}
                </tbody>
              </Table>
            </div>
          )
        })}
      </div>
    )
  }

  //   render() {
  //     return (
  //       <div>
  //         <Table striped bordered hover>
  //   <thead>
  //     <tr>
  //       <th>Law Number</th>
  //       <th>Law Entity</th>
  //       <th>Law Value </th>
  //       <th>Law Calc</th>
  //       <th>Min</th>
  //       <th>Max</th>
  //       <th>Description</th>
  //       <th>Edit</th>
  //     </tr>
  //   </thead>
  //   <tbody>
  //     {this.state.allLaws.map( (oneLaw) =>
  //         ( <tr> <td>{oneLaw.LawNumber}</td>
  //         <td>{oneLaw.LawEntity}</td>
  //         <td>{oneLaw.LawValue}</td>
  //         <td>{oneLaw.LawCalc}</td>
  //         <td>{oneLaw.min}</td>
  //         <td>{oneLaw.max}</td>
  //         <td>{oneLaw.description}</td>
  //         <td> <Button variant="outline-secondary">Edit Law</Button></td>
  //          </tr>)) }

  //   </tbody>
  // </Table>
  //       </div>
  //     )
  //   }
}

export default AdminViewLaws;
