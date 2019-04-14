import React, { Component } from "react";
import DynamicForm from "../components/DynamicForm";
import { Form, FormGroup, Label, Input, Row, Container, Button } from "reactstrap";
import axios from "axios";



export class InvestorEditForm extends Component {


    constructor(props) {
        super(props);
    
        this.state = {
          model: [],
          case: {},
          form_type: "",
          comment:{

          },
          
        };


        try{
            const myID = this.props.match.params.id
        axios.get('http://localhost:3000/api/cases/' +  this.props.match.params.id).then(res =>{
            
            console.log('res ====>>>   ', res )
            const company = res.data.data
            this.setState({
                form_type: company.form_type,
                case: company,
                comment: company.comment

            })
            console.log(this.state.form_type)
            axios.get('http://localhost:3000/AdminFindFormType').then(res=>{

            console.log(res)
            res.data.data.map((form)=>{
                console.log(this.state.form_type)
                console.log(form)
                if(form.formName == this.state.form_type){
                    this.setState({
                        model: form.model
                    })
                }
                else{
                    console.log('not this form type')
                }
            })


        })
        })


        
    }
        catch(error){
            console.log('catch error =====> ', error)
        }
    }

    handleChange(event){
      let _case = this.state.case
      _case[event.target.name] = event.target.value
      this.setState({
        case: _case
      })
      console.log(this.state.case)
    }

    
    renderForm() {
        let model = this.state.model;
        console.log('HHEHEHEHEHEHEHE%%%%')
        let formUI = model.map(m => {
          let key = m.key;
          let label = m.label;
          let type = m.type || "text";
          let props = m.props || {};
          
    
          let input = (
            <Row>
              <div className="col-xs-5">
              <Input className="form-input"
                name={key}
                type={type}
                {...props}
                placeholder={this.state.case[key]}
                key={"i" + key}
                onChange={this.handleChange.bind(this)}
                
              />
              </div>
                     <br></br>
                     </Row>
            );

          return (
            
            <div class =" col-sm-10">
            <FormGroup>
            <label className="label label-primary" for="ex2">{m.label}</label>
              {input}
              
            </FormGroup>
            </div>
     
          );
        });
        return formUI;
      }

      editCase(event){
        event.preventDefault()
        axios.put('http://localhost:3000/api/cases/'+this.props.match.params.id,this.state.case).then(res=>{
            console.log(res)

        })


      }
    




  render() {
    const input = this.renderForm()
    return (
      <div>
          <Form>
            <h1>hi</h1>
          {input}
          <Button onClick={this.editCase.bind(this)}>Edit</Button>
          </Form>
      </div>
    )
  }
}

export default InvestorEditForm


