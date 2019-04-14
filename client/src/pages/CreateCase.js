import React, { Component } from "react";
import DynamicForm from "../components/DynamicForm";
import { Form, FormGroup, Label, Input, Container } from "reactstrap";
import axios from "axios";

export class CreateCase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      model: [],
      dropdownOpen: false,
      formTypes: [],
      form_type: ""
    };

    axios.get("http://localhost:3000/AdminFindFormType").then(formTypes => {
      console.log(formTypes);
      this.setState({
        formTypes: formTypes.data.data,
        model: formTypes.data.data[0].model,
        dropdownOpen: false,
        form_type: formTypes.data.data[0].formName
      });
    });
  }

  handleChangeForm = event => {
    this.state.formTypes.map(form => {
      if (form.formName == event.target.value) {
        this.setState({
          model: form.model,
          form_type: form.formName
        });
      }
    });
  };

  remap() {
    return this.state.formTypes.map(form => {
      return <option> {form.formName} </option>;
    });
  }

  render() {
    return (
      <div>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css"
        />

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js" />

        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js" />
        <h1> {this.state.form_type} Form </h1>
        <div class="w-25 p-3">
          <Label for="exampleSelectMulti">Select Company Type</Label>
          <Input
            type="select"
            name="selectMulti"
            id="exampleSelectMulti"
            onChange={this.handleChangeForm.bind(this)}
          >
            {this.remap()}
          </Input>
        </div>
        <br />
        <br />
        <br />
          <Form>
            
            <FormGroup>
              <DynamicForm
                model={this.state.model}
                form_type={this.state.form_type}
              />
            </FormGroup>
          </Form>
      </div>
    );
  }
}

export default CreateCase;
