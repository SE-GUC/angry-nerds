import React from 'react';
import { Table , UncontrolledCollapse, Button, CardBody, Card } from 'reactstrap';
import axios from 'axios'


import miniJournal from '../components/miniJournal'

class electronicJournal extends React.Component {

  state = {
    companies: []
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



  render() {
    return (
       <h1>Companies</h1>,
      this.state.companies.map((company)=>
      
      <div>
      <Table bordered>
        
        <tr>
          <th><Button color="primary" id="toggler" style={{ marginBottom: '1rem' }}>
    {company.english_name}
  </Button>
  <UncontrolledCollapse toggler="#toggler">
    <Card>
      <CardBody>

      Also Known as {company.arabic_name}.
This Company is of type {company.form_type} under {company.regulated_law}. It's in the governorate of {company.governorate}, in {company.city} at {company.address}.
The main Center Phone is {company.main_center_phone}.
The main Center Fax is {company.main_center_fax}.
It has an Equity Capital of {company.equality_capital} and uses the {company.currency} Currency.
The company is managed by {company.managers.name}.


      </CardBody>
    </Card>
  </UncontrolledCollapse></th></tr></Table>
    </div>

      
      )

      
    );
  }
}
export default electronicJournal;
