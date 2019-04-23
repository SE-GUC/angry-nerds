import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'
import Modal from 'react-bootstrap/Modal'
import { Redirect } from 'react-router'
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IconContext } from "react-icons";
 


import axios from 'axios'

export class LawyerOpenCase extends Component {

  state = {
    oneCase: {} ,
    comment: {},
    open: {},
    formType: {model: []} ,
    back: false, 
    action: '',
    show: true

  }

  handleClose() {
    this.setState({ show: false });
    //this.setState({back: true})
    this.props.history.push('/LawyerHome')
  }

  handleShow() {
    this.setState({ show: true });
  }

  renderModal(action){
    console.log('modal ',this.state)
    if(action === 'accept'){
    console.log('accept')
    return(
    <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Case Accepted</Modal.Title>
          </Modal.Header>
          <Modal.Body>Case accepted and sent to reviewer</Modal.Body>
        </Modal>
    )
  }
    else{
      if(action === 'reject'){
        return(
          <Modal show={this.state.show} onHide={this.handleClose.bind(this)} style={{backgroundColor: "red"}}>
                <Modal.Header closeButton>
                  <Modal.Title>Case Rejected</Modal.Title>
                </Modal.Header>
                <Modal.Body>Case rejected and sent back to investor</Modal.Body>
              </Modal>
          )
      } 
      else{
        return(<div></div>)
      }
    }

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

  editCase(e,field,_field,index){
    if(!field.multiple){
    console.log('target : ',e.target.value,' field : ',field.key, ' test: ',this.state.oneCase)
    let newCase = this.state.oneCase
    newCase[field.key] = e.target.value
    this.setState({oneCase: newCase})
    }
    else{
      let newCase = this.state.oneCase
      if(index < newCase[field.key].length){
      console.log('newwww print>>>> ' + newCase[field.key][index][_field.key] + ' ??? ' + newCase[field.key][index].name)
      newCase[field.key][index][_field.key] = e.target.value
      this.setState({oneCase: newCase})
      }
      else{
        newCase[field.key].push({ [_field] : e.target.value})
      }
    }
  }

  closeCase(e){
    console.log('CLOSE CASE')
    e.preventDefault()
    this.setState({back: true})
    let path = 'http://localhost:3000/lawyerCloseCase/' + this.state.oneCase._id
    try{
      console.log('get')
      axios.get(path).then(res => {console.log(res); })
      this.props.history.push('/LawyerHome')
    }
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
    
    axios({
      method: 'PUT',
      url: 'http://localhost:3000/caseAproveedAtLawyer/'+ this.state.oneCase._id 
      }).then(res => console.log('OKAYYY',res))
        .catch(error => console.log(error))

      this.setState({action: 'accept'})

      let _oneCase = JSON.parse(JSON.stringify(this.state.oneCase))
      delete _oneCase['_id']
      delete _oneCase['__v']
      
      axios.put('http://localhost:3000/api/Cases/' + this.state.oneCase._id,_oneCase)

      


  }

  reject(e){
    e.preventDefault()
    axios({
    method: 'PUT',
    url: 'http://localhost:3000/caseDisAproveedAtLawyer/'+ this.state.oneCase._id ,
    headers: {
      'Authorization':localStorage.getItem('jwtToken'),
      'Content-Type' : 'application/json',
      'Accept' : 'application/json' 
    },
    data: {
      comment : this.state.comment
    }
    }).then(res => console.log('OKAYYY',res))
      .catch(error => console.log(error))

      this.setState({action: 'reject'})

      let _oneCase = JSON.parse(JSON.stringify(this.state.oneCase))
      delete _oneCase['_id']
      delete _oneCase['__v']
      
      axios.put('http://localhost:3000/api/Cases/' + this.state.oneCase._id,_oneCase)


  }

  addRow(e,field){
    let _oneCase = this.state.oneCase
    _oneCase[field.key].push({})

    this.setState({oneCase: _oneCase})    
  }


  deleteRow(e,field,index){
    
    let _oneCase = this.state.oneCase
    _oneCase[field.key].splice(index, 1)
    this.setState({oneCase: _oneCase})    

}

showComment(field){
  if(this.state.oneCase.comment && this.state.oneCase.comment.text && this.state.oneCase.comment.text[field.key]){
    return(
      <h6 style={{color: 'red'}}>{this.state.oneCase.comment.text[field.key]}</h6>
    )
  }
}

  render() {
    console.log('BOOLEAN --> ',this.state.open)
    // if(this.state.back){
    //   console.log('REDIRECT')
    //   return (
    //     <Redirect to='/LawyerHome' />
    //   )
    // }
    // else{

    if(this.state.formType.model.length !== 0){
    console.log('form ::: ',this.state.oneCase)
    return (
      <div>
        <Form>
        {this.state.formType.model.map(field => {
          if(!field.multiple || this.state.oneCase[field.key].length === 0){
          return (
            <div className="d-flex bd-highlight">
          <div className="p-2 w-100 bd-highlight" >
          <Form.Group>
            <Form.Label>
              {field.label}
            </Form.Label>
            <Form.Control onChange={(e) => this.editCase(e,field)}placeholder={this.state.oneCase[field.key]} type={field.type} {...field.props}/>
          </Form.Group>
          {this.showComment(field)}
          {this.showCommentFields(field)}
          </div>
          <div className="p-2 flex-shrink-1 bd-highlight">
            <Form.Label style={{color: "white"}}>`</Form.Label> 
            <Button value={field.key} onClick={(e) => { e.preventDefault(); let c = this.state.open; c[field.key] = !c[field.key]; this.setState({open: c})}  }
          aria-controls={"control" + field.key}
          aria-expanded={this.state.open[field.key]} >+</Button>
          </div>
          </div>
          )}
          else{
          
            return(
              <div>
              <h3>{field.key}</h3>
            {this.state.oneCase[field.key].map((manager,index) => {
              return(
                <div className="d-flex bd-highlight">
              
              {field.fields.map(_field => {
                return (
                  <div className="p-2 w-100 bd-highlight" >
                  <Form.Group>  
                    <Form.Label>  
                    {_field.label}
                  </Form.Label>
                <Form.Control onChange={(e) => this.editCase(e,field,_field,index)} placeholder={this.state.oneCase[field.key][index][_field.key]} type={_field.type} />
                </Form.Group>  
                </div>
                )
              })}
              <div className='d-flex align-items-center'>
                <button type="button" class="close" aria-label="Close"
                onClick={(e) => this.deleteRow(e,field,index)}
                >
                 <span aria-hidden="true">&times;</span>
              </button>
              </div>
             
            </div>
              )
            })}
            {this.showCommentFields(field)}
             <div className="float-right">
            <Form.Label style={{color: "white"}}>`</Form.Label> 
            <Button  value={field.key} onClick={(e) => { e.preventDefault(); let c = this.state.open; c[field.key] = !c[field.key]; this.setState({open: c})}  }
          aria-controls={"control" + field.key}
          aria-expanded={this.state.open[field.key]} >+</Button>

          </div>
          <Button onClick={(e) => this.addRow(e,field)}>Add</Button>
          <div> &nbsp;&nbsp;</div> 

            </div>
            )
          }
        })
      }
        </Form>

          <ButtonToolbar className="d-flex bd-highlight">
      <Button variant="success" onClick={this.approve.bind(this)} className="p-2 flex-fill bd-highlight">
      <IconContext.Provider value={{ className: "float-left", size: "1.5em" , color:"white"}}>
        <div><IoIosCheckmarkCircleOutline /></div>
      </IconContext.Provider>
      Approve
      </Button>
            <div> &nbsp;&nbsp;</div> 
            <Button variant="danger" className="p-2 flex-fill bd-highlight" onClick={this.reject.bind(this)} >
            <IconContext.Provider value={{ className: "float-left", size: "1.5em" ,color:"white"}}>
        <div><IoIosCloseCircleOutline /></div>
      </IconContext.Provider>
      Reject
      </Button>
            <div> &nbsp;&nbsp;</div> 
            <Button variant="secondary"  className="p-2 flex-fill bd-highlight" onClick={this.closeCase.bind(this)}>Close</Button>

          </ButtonToolbar>
          {this.renderModal(this.state.action)}
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
//}
}

export default LawyerOpenCase
