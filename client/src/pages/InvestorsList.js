import React, { Component } from 'react'
import Axios from 'axios';

export class InvestorsList extends Component {



    state = {
        investors:[]
    }

    componentWillMount(){
        Axios.get('http://localhost:3000/api/Investor').then(investors => {
            console.log(investors)
            this.setState({
                investors: investors.data.data
            })
        })
    }


    renderInvestors(){

        let list = this.state.investors.map((Investor) => {
          return  <h1> {Investor.firstName} </h1>
        })

        return list

    }



  render() {
    return (
      <div>
          <h1> hi </h1>
        {this.renderInvestors()}
      </div>
    )
  }
}

export default InvestorsList
