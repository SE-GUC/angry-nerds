import React, { Component } from 'react'
import axios from 'axios'

export class LawyerOpenCase extends Component {

  state = {
    oneCase: {} 
  }

  componentDidMount(){
      axios.get('http://localhost:3000/api/Cases/' + this.props.match.params.id).then(res => this.setState({oneCase: res.data.data}))
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <h1>{this.state.oneCase.english_name}</h1>
      </div>
    )
  }
}

export default LawyerOpenCase
