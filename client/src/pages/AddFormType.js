import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Alert, Row } from "reactstrap";
import { library } from '@fortawesome/fontawesome-svg-core';
import axios from "axios";
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/json';
import 'brace/theme/monokai';


export class AddFormType extends Component {

    constructor(props){
        super(props)

        this.state={
            formName:'',
            text:'',
            alert:false,
            alertMessage:'',
            alertColor:'',
            model:{

            }
        }

    }

    change(event){

        this.setState({
            model: JSON.parse(event)
        })

        console.log(this.state.model)

    }

    shouldComponentUpdate(nextProps, nextState) {
      if (this.state.model !== nextState.model) {
        return false
      } else {
        return true;
      }
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
            this.setState({
              alert:true,
              alertMessage:'A new Form Type has been successfully Created',
              alertColor:'success'
            });
        }
        catch (e) {
          console.log(e.response.data.message)
          this.setState({
            alert:true,
            alertMessage:e.response.data.message,
            alertColor:'danger'
          });
        }
    }
    onDismiss() {
      this.setState({
        alert: false
      });
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
        </FormGroup>
        <AceEditor
                    mode="json"
                    theme="monokai"
                    onChange={this.change.bind(this)}
                    name="UNIQUE_ID_OF_DIV"
                    editorProps={{
                        $blockScrolling: true
                    }}
                />
        <Alert
              color={this.state.alertColor}
              isOpen={this.state.alert}
              toggle={this.onDismiss.bind(this)}
            >
              {this.state.alertMessage}
        </Alert>

        <Button color="primary" style={{float:"right"}} onClick={this.submit.bind(this)}>Add Field</Button>
      </Form>


      
 
      </div>
    )
  }
}

export default AddFormType
