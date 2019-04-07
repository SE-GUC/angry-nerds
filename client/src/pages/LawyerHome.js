import React, { Component } from 'react';
import CaseCard from '../components/CaseCard'

import axios from 'axios'



class LawyerHome extends Component {

  state = {
      allCases: []
  }

  componentDidMount() {
    axios.get('http://localhost:3000/api/Cases').then(
          res => this.setState({allCases: res.data.data})
      )
  }

  render() {
    return (
        this.state.allCases.map( (oneCase) => ( <CaseCard key={oneCase._id} case={oneCase}/>) )
    );
  }
}

export default LawyerHome;
