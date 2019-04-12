import React, { Component } from 'react'
import DynamicForm from '../components/DynamicForm'
import axios from 'axios'


export class CreateCase extends Component {
    
    async componentDidMount(){
        const formTypes = await axios.get('http://localhost:3000/AdminFindFormType')
        console.log(formTypes.data.data)
        this.state.formTypes = formTypes.data.data
    }

    state={
        model:[
            {key: "name", label: "Name", props: {required: true}},
            {key: "age",label: "Age", type: "number", props:{max:5,min:0}},
            {key: "email", label: "email", type:"text", props:{required: true}}
        ]
    }
    
    constructor(props){
        super(props)
    }



  render() {
    return (
      <div>
        <DynamicForm model = {this.state.model} />
      </div>
    )
  }
}

export default CreateCase
