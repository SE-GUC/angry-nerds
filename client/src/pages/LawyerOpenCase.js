import React, { Component } from 'react'
import axios from 'axios'

export class LawyerOpenCase extends Component {

  state = {
    oneCase: {} ,
    formType: {}

  }

  componentDidMount(){
      axios.get('http://localhost:3000/api/Cases/' + this.props.match.params.id).then((res) => {
        this.setState({oneCase: res.data.data});
        console.log(res.data.data);
        axios.get('http://localhost:3000/AdminFindFormType/' + res.data.data.form_type).then(_res => {this.setState({formType: _res.data.data})
      console.log('hereeee ==>',_res.data)});
  })
      

  }

  render() {
    console.log(this.state.formType)
    return (
      <div>
        <h1>{this.state.oneCase._id}</h1>
        {/* <h1>{this.state.formType.formName}</h1> */}

      </div>
    )
  }
}

export default LawyerOpenCase
