import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import Spinner from 'react-bootstrap/Spinner'
import CardDeck from 'react-bootstrap/CardDeck'
import Card from 'react-bootstrap/Card'
import axios from "axios";
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
export class Performance extends Component {
  state = {
    performanceArray: [],
    dataLine: {},
    loaded: false,
    reloaded: false,
    average: 0,
    unique: 0,
    type: 'open'
  };

  componentDidMount() {

    let date = new Date()
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    console.log(firstDay,lastDay)
    
    let body = {
      endDate: lastDay,
      startDate: firstDay,
      type: this.state.type
    }
    console.log(body)
    axios.put("http://localhost:3000/calculateRange/" + this.props.match.params.id,body)
      .then(res => {
        console.log(res)  
        this.setState({ performanceArray: res.data.data, loaded: true });
        this.createGraph()
      })
      .catch(err => console.log(err))

      axios.get('http://localhost:3000/calculateAverageMins/' + this.props.match.params.id)
        .then(res => this.setState({average: res.data.average}))
        .catch(err => console.log(err))

      axios.get('http://localhost:3000/calculateUniqueCases/' + this.props.match.params.id)
        .then(res => this.setState({unique: res.data.cases}))
        .catch(err => console.log(err))

  }

  handleChange(value, event) {
    this.setState({ type: value, reloaded: true });

    let date = new Date()
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    
    let body = {
      endDate: lastDay,
      startDate: firstDay,
      type: value
    }
    console.log(body)
    axios.put("http://localhost:3000/calculateRange/" + this.props.match.params.id,body)
      .then(res => {
        console.log(res)  
        this.setState({ performanceArray: res.data.data, reloaded: false});
        this.createGraph()
      })
      .catch(err => console.log(err))
  }

  


  createGraph() {
    let dataLine = {
      labels: this.state.performanceArray.map(label => {
        return new Date(label.date).getDate();
      }),
      datasets: [
        {
          label: false,
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.state.performanceArray.map(label => {
            return label.cases;
          })
        }
      ]
    };

    this.setState({ dataLine: dataLine });
  }

  render() {
    if (this.state.loaded) {
      return (
        <div> 
        <div className='p-2'>
          <CardDeck>
  <Card>
    <Card.Body>
      <Card.Title>Unique Cases</Card.Title>
      <Card.Text className='display-4'>
     {this.state.unique}
      </Card.Text>
    </Card.Body>
    
  </Card>
  <Card>
    <Card.Body>
      <Card.Title>Average Mins</Card.Title>
      <Card.Text className='display-4'>
        {Math.round(this.state.average)}
      </Card.Text>
    </Card.Body>
  </Card>
  </CardDeck>
  </div>
  <div className="d-flex justify-content-center">

  <ToggleButtonGroup
        type="radio"
        name="options"
        value={this.state.type}
        onChange={this.handleChange.bind(this)}
      >

        <ToggleButton value={'open'}>Open</ToggleButton>
        <ToggleButton value={'close'}>Close</ToggleButton>
        <ToggleButton value={'reviewer'}>Send to Reviewer</ToggleButton>
        <ToggleButton value={'lawyer'}>Send to Lawyer</ToggleButton>
        <ToggleButton value={'investor'}>Send to Investor</ToggleButton>
      </ToggleButtonGroup>
      {(this.state.reloaded)?<div className='float-right'><Spinner animation="grow" /></div>:<div></div>}
        </div>
        <div className='p-2'>
          <MDBContainer>
            <Line
              data={this.state.dataLine}
              options={{ responsive: true, legend: { display: false } }}
            />
          </MDBContainer>
        </div>
        </div>
      );
    } else {
      return (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <Spinner />
          </div>
        </div>
      );
    }
  }
}

export default Performance;
