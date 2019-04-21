import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Alert, Row } from "reactstrap";
import { library } from '@fortawesome/fontawesome-svg-core';
import axios from "axios";



export class AddFormType extends Component {

    constructor(props){
        super(props)

        this.state={
            formName:'',
            text:''
        }

    }

    change(event){

        this.setState({
            model: event.target.value
        })

        console.log(this.state.model)

    }

    async submit(event){
        try{

            event.preventDefault()
            console.log(event.target.value)
            this.setState({
                text: event.target.value
            })
    
            const form = JSON.parse(this.state.model)
            const request = await axios.post('http://localhost:3000/AdminCreateFormType', form)
            console.log(request)
        }
        catch(e){
            console.log(e)
        }
    }

  render() {
    return (
      <div >
              <br/>

          <h1>Add Form Type</h1>
          <Form>
              <br/>
       <FormGroup>
           <ol>
          <li><Label for="exampleText">Write Down JSON to define new form</Label><br/></li>
          <li> <Label for="exampleText">Please provide english and arabic field name</Label><br/></li>
          <li> <Label for="exampleText">if a certain element is an array of fields write it in the format of [Object1,Object2]</Label><br/></li>
          <li><Label for="exampleText">Provide type and props</Label><br/> </li>
            </ol>
          <Input type="textarea" rows="20" cols="50" name="text" id="exampleText" onChange={this.change.bind(this)}/>
        </FormGroup>
        <Button color="primary" style={{float:"right"}} onClick={this.submit.bind(this)}>Add Field</Button>
      </Form>
 
      </div>
    )
  }
}

export default AddFormType
