import React, { Component } from "react";
import DynamicForm from "../components/DynamicForm";
import { Form, FormGroup, Label, Input, Container } from "reactstrap";
import axios from "axios";

export class CreateCase extends Component {
  
  
  
  constructor(props) {
    super(props);

    this.state = {
      model: [],
      formModel:[],
      dropdownOpen: false,
      formTypes: [],
      form_type: ""
    };

    axios.get("http://localhost:3000/AdminFindFormType").then(formTypes => {
      console.log(formTypes);
      this.setState({
        formTypes: formTypes.data.data,
        model: formTypes.data.data[0].model,
        formModel: formTypes.data.data[0].model,
        dropdownOpen: false,
        form_type: formTypes.data.data[0].formName
      });
    });
  }

  handleChangeForm = event => {
    event.preventDefault()
    console.log("pauuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuullllllll")
    this.state.formTypes.map(form => {
      if (form.formName == event.target.value) {
        this.setState({
          formModel: JSON.parse(JSON.stringify(form.model)),
          model: form.model,
          form_type: form.formName
        })
      }
    });
  };

  remap() {
    return this.state.formTypes.map(form => {
      return <option> {form.formName} </option>;
    });
  }

  addField(fieldName){
    
    //field format from formModel
    let array2 = []
    this.state.formModel.map(field => {
      if(field.name === fieldName){
       array2 = field.fields
      }
    })

    console.log('array2 ====>>>>>', array2)
  
    //append new field to model
    let array = []
    let counter = 0
    this.state.model.map(field => {
      if(field.name == fieldName){
        array = field.fields
        console.log('array1 ====>>>>', array )
        array = array.concat(array2) 

        console.log('big array ======>>>>', array)
        let newModel = this.state.model
        console.log('previous model =====>>>>>', newModel)
        newModel[counter] = {
          multiple:"true",
          name: fieldName,
          fields: array
        }
        console.log(newModel)
        this.setState({
          model: newModel
        })
      }
      counter++
    })


  }

  render() {

    

    return (
      <div>
        <h1> {this.state.form_type} Form </h1>
      <div class="w-25 p-3" > 
          <Label for="exampleSelectMulti">Select Company Type</Label>
          <Input
            type="select"
            name="selectMulti"
            id="exampleSelectMulti"
            onChange={this.handleChangeForm.bind(this)}>
         
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
                addField = {this.addField.bind(this)} 
              />
            </FormGroup>
          </Form>
      </div>
    );
  }
}

export default CreateCase;
