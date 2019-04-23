import React, { Component } from 'react'

export class viewCompany extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.match.params.id}</h1>
      </div>
    )
  }
}

export default viewCompany
