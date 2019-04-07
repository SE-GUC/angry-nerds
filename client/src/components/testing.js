import React from 'react';
import axios from 'axios';

export default class trsting extends React.Component {
  state = {
    fname: '',
    mname:'',
  }

  handleChangeFName = event => {
    this.setState({ fname: event.target.value});                                
  }

  handleChangeMName = event => {
    this.setState({ mname: event.target.value});                                
  }



  handleSubmit = event => {
    event.preventDefault();

    const user = {
      fname: this.state.fname,
      mname: this.state.mname
    };

    axios.post(`https://jsonplaceholder.typicode.com/users`, { user })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Person Name:
            <input type="text" name="fname"  onChange={this.handleChangeFName} />
            <input type="text" name="mname"  onChange={this.handleChangeMName} />

          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
}