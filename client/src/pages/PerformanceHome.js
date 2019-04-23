import { Redirect } from 'react-router'
import React, { Component } from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import axios from 'axios'
import ListGroup from 'react-bootstrap/ListGroup'
import Spinner from 'react-bootstrap/Spinner'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
//import { browserHistory } from 'react-router';




export class PerformanceHome extends Component {

  state = {
      key: 'lawyer',
      redirect: false,
      redirectID: '',
      lawyers: [],
      reviewers: [],
      filteredLawyers: [],
      filteredReviewers: [],
      lawyerSearch: '',
      reviewerSearch: '',
      lawyerLoaded: false,
      reviewerLoaded: false
  }

  componentDidMount(){

    axios.get('http://localhost:3000/api/Lawyer')
    .then(res => this.setState({lawyers: res.data.data , lawyerLoaded: true}))
    .catch(err => console.log(err))

    axios.get('http://localhost:3000/api/Reviewer')
    .then(res => this.setState({reviewers: res.data.data, reviewerLoaded: true }))
    .catch(err => console.log(err))

  }

  lawyerSearch(e){
    console.log(e.target.value)
    this.setState({lawyerSearch: e.target.value})
  }

  reviewerSearch(e){
    console.log(e.target.value)
    this.setState({reviewerSearch: e.target.value})
  }

  redirect(e,id){
    //this.setState({redirect: true, redirectID: id})
    this.props.history.push('/Performance/' + id)

  }

  loadLawyers() {
    if(this.state.lawyerLoaded){
      if(this.state.lawyerSearch === ''){
      return(
        <div className='p-2'>
        
        <ListGroup >

        {this.state.lawyers.map(lawyer => {
          return(
            <div >
            <ListGroup.Item className='d-flex' action>
            <div className='p-2'>
          <div> <strong>  ID:</strong>  <code>{lawyer._id}</code> </div> 
          <div> <strong>Name: </strong>{lawyer.FName + ' ' + lawyer.LName} </div> 
          </div>
          <Button size='sm' className='ml-auto p-2' variant="outline-primary" onClick={(e) => this.redirect(e,lawyer._id)}> Check performance </Button>
            </ListGroup.Item>
            </div>
          )
        })}

        </ListGroup>
        </div>
      )
    }
    else{
      return(
        <div className='p-2'>
        
        <ListGroup >
        {this.state.lawyers.map(lawyer => {
          let name = lawyer.FName + ' ' + lawyer.LName
          if(name.includes(this.state.lawyerSearch))
            return(
              <div className='d-flex justify-content-center'>
            <ListGroup.Item action >
          <div> <strong>  ID:</strong>  <code>{lawyer._id}</code> </div> 
           <div> <strong>Name:</strong> {(lawyer.FName + ' ' + lawyer.LName).split(this.state.lawyerSearch)[0]}<mark>{this.state.lawyerSearch}</mark> {(lawyer.FName + ' ' + lawyer.LName).split(this.state.lawyerSearch)[1]} </div>
             <Button className='mr-auto p-2' variant="outline-primary" onClick={(e) => this.redirect(e,lawyer._id)}> Check performance </Button>
            </ListGroup.Item>
            </div>
            )
        })}

        </ListGroup>
        </div>
      )
    }
    }
    else{
      return(
      <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <Spinner />
          </div>
        </div>
      )
    }
  }

  loadReviewers() {
    
    if(this.state.reviewerLoaded){
      if(this.state.reviewerSearch === ''){
      return(
        <div className='p-2'>
        
        <ListGroup >

        {this.state.reviewers.map(reviewer => {
          return(
            <div >
            <ListGroup.Item className='d-flex' action>
            <div className='p-2'>
          <div> <strong>  ID:</strong>  <code>{reviewer._id}</code> </div> 
          <div> <strong>Name: </strong>{reviewer.FName + ' ' + reviewer.LName} </div> 
          </div>
          <Button size='sm' className='ml-auto p-2' variant="outline-primary" onClick={(e) => this.redirect(e,reviewer._id)}> Check performance </Button>
            </ListGroup.Item>
            </div>
          )
        })}

        </ListGroup>
        </div>
      )
    }
    else{
      return(
        <div className='p-2'>
        
        <ListGroup >
        {this.state.reviewers.map(reviewer => {
          let name = reviewer.FName + ' ' + reviewer.LName
          if(name.includes(this.state.reviewerSearch))
            return(
              <div className='d-flex justify-content-center'>
            <ListGroup.Item action >
          <div> <strong>  ID:</strong>  <code>{reviewer._id}</code> </div> 
           <div> <strong>Name:</strong> {(reviewer.FName + ' ' + reviewer.LName).split(this.state.reviewerSearch)[0]}<mark>{this.state.reviewerSearch}</mark> {(reviewer.FName + ' ' + reviewer.LName).split(this.state.reviewerSearch)[1]} </div>
             <Button className='mr-auto p-2' variant="outline-primary" onClick={(e) => this.redirect(e,reviewer._id)}> Check performance </Button>
            </ListGroup.Item>
            </div>
            )
        })}

        </ListGroup>
        </div>
      )
    }
    }
    else{
      return(
      <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <Spinner />
          </div>
        </div>
      )
    }
  }


  render() {
    // if(this.state.redirect){
    //   console.log('IMHERE')
    //   this.props.history.push('/Performance/' + this.state.redirectID)
    //   //browserHistory.push('/Performance/' + this.state.redirectID)
    // }
    // else{
    return (
        <Tabs
        id="performance-tabs"
        fill
        activeKey={this.state.key}
        onSelect={key => this.setState({ key })}
      >
        <Tab eventKey="lawyer" title="Lawyers">
        <Form >
          <FormControl type="text" placeholder="Search..." className="mr-sm-2" onChange={this.lawyerSearch.bind(this)}/>
        </Form>
          {this.loadLawyers()}
        </Tab>
        <Tab eventKey="reviewer" title="Reviewers">
        <Form >
          <FormControl type="text" placeholder="Search..." className="mr-sm-2" onChange={this.reviewerSearch.bind(this)}/>
        </Form>
        {this.loadReviewers()}
        </Tab>
      </Tabs>
    )
    //} 
  }
}

export default PerformanceHome
