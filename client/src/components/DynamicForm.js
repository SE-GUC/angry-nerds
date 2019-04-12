import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from 'axios'

export class DynamicForm extends Component {
  state = {};
  
  constructor(props) {
    super(props);
  }

  async handleSubmit(event){
      event.preventDefault();
      console.log(this.state);
      const request = await axios.post('http://localhost:3000/InvestorFillForm',this.state)
      console.log(request)
  }

  handleChange(event){
    this.setState({
        [event.target.name]: event.target.value
    })
  }

  renderForm() {
    let model = this.props.model;

    let formUI = model.map(m => {
      let key = m.key;
      let label = m.label;
      let type = m.type || "text";
      let props = m.props || {};

      const input = <Input className="form-input" name={key} type={type} 
      {...props} key={"i" + key} onChange={this.handleChange.bind(this)} />
      
      return (
        <FormGroup>
          <Label className="form-label" key={"l" + key}>
            {m.label}
          </Label>
          {input}
        </FormGroup>
      );
    });
    return formUI;
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit.bind(this)}>
        {this.renderForm()}
        <Button>Submit Form</Button>
        </Form>
      </div>
    );
  }
}

export default DynamicForm
