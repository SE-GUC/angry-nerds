import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'
import { Redirect } from 'react-router'
import axios from 'axios'

export class LawyerOpenCase extends Component {

  state = {
    oneCase: {} ,
    comment: {},
    open: {},
    formType: {model: []} ,
    back: false

  }

  addComment(e,field){
    console.log('target : ',e.target.value,' field : ',field.key, ' test: ',this.state.comment)
    let newComment = this.state.comment
    newComment[field.key] = e.target.value
    this.setState({comment: newComment})
  }

  componentDidMount(){
      axios.get('http://localhost:3000/api/Cases/' + this.props.match.params.id).then((res) => {
        this.setState({oneCase: res.data.data});
        console.log(res.data.data);
        axios.get('http://localhost:3000/AdminFindFormType').then(_res => {this.setState({formType: _res.data.data.filter(form => {
          if(form.formName === res.data.data.form_type){return form}
        })[0]});
        _res.data.data.filter(form => {
        if(form.formName === res.data.data.form_type){return form}
      })[0].model.map((field)=> {let c = this.state.open; c[field.key] = false; console.log('begin: ',c); this.setState({open: c})});   
      console.log('hereeee ==>',_res.data)});
  })
  }

  editCase(e,field){
    console.log('target : ',e.target.value,' field : ',field.key, ' test: ',this.state.oneCase)
    let newCase = this.state.oneCase
    newCase[field.key] = e.target.value
    this.setState({oneCase: newCase})
  }

  closeCase(e){
    console.log('CLOSE CASE')
    e.preventDefault()
    this.setState({back: true})
    let path = 'http://localhost:3000/lawyerCloseCase/' + this.state.oneCase._id
    try{
      console.log('get')
      axios.get(path).then(res => console.log(res))}
      catch(e){
        console.log(e)
    }
  }

  showCommentFields(field) {
    
    return(
      <Collapse in={this.state.open[field.key]}>
      <div id={"control" + field.key}>
      <InputGroup size="sm" className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="inputGroup-sizing-sm" style={{color: "red"}}>Leave a comment:</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl  onChange={(e) => {this.addComment(e,field)}} style={{color: "red"}} aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
      </InputGroup>
      </div>
    </Collapse>
    )
  }

  approve(e){
    console.log('APPROVE')
    e.preventDefault()
    console.log(localStorage.getItem('jwtToken'))
    axios.put('http://localhost:3000/caseAproveedAtLawyer/'+ this.state.oneCase._id,{headers: {"Authorization":localStorage.getItem('jwToken')}}).then(res => console.log(res))
  }

  reject(e){
    e.preventDefault()
  }

  render() {
    console.log('BOOLEAN --> ',this.state.open)
    if(this.state.back){
      console.log('REDIRECT')
      return (
        <Redirect to='/LawyerHome' />
      )
    }
    else{

    if(this.state.formType.model.length !== 0){
    console.log('form ::: ',this.state.oneCase)
    return (
      <div>
        <Form>
        {this.state.formType.model.map(field => {
          return (
            <div className="d-flex bd-highlight">
          <div className="p-2 w-100 bd-highlight" >
          <Form.Group>
            <Form.Label>
              {field.label}
            </Form.Label>
            <Form.Control onChange={(e) => this.editCase(e,field)}placeholder={this.state.oneCase[field.key]} type={field.type} {...field.props}/>
          </Form.Group>
          {this.showCommentFields(field)}
          </div>
          <div className="p-2 flex-shrink-1 bd-highlight">
            <Form.Label style={{color: "white"}}>`</Form.Label> 
            <Button value={field.key} onClick={(e) => { e.preventDefault(); let c = this.state.open; c[field.key] = !c[field.key]; this.setState({open: c})}  }
          aria-controls={"control" + field.key}
          aria-expanded={this.state.open[field.key]} >+</Button>
          </div>
          </div>
          )
        })}
        </Form>

          <ButtonToolbar className="d-flex bd-highlight">
            <Button variant="success" onClick={this.approve.bind(this)} className="p-2 flex-fill bd-highlight">Approve</Button>
            <div> &nbsp;&nbsp;</div> 
            <Button variant="danger" className="p-2 flex-fill bd-highlight" onClick={this.reject.bind(this)} >Reject</Button>
            <div> &nbsp;&nbsp;</div> 
            <Button variant="secondary"  className="p-2 flex-fill bd-highlight" onClick={this.closeCase.bind(this)}>Close</Button>

          </ButtonToolbar>
      </div>
    )
    }
    else{
      return(
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <Spinner  />
          </div>
        </div>
      )
    }
  }
}
}

export default LawyerOpenCase
