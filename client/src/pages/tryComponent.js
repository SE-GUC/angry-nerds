import React, { Component  } from "react";
import Bill from "../components/Bill"
import { Form, FormGroup, Label, Input, Container } from "reactstrap";


class tryComponent extends Component {

    state={
        law:'',
        capital:'',
        flag:false
    }

    changeFlag(){
        {this.setState({flag:false})}
    }
    chooseLaw(event){
        {this.setState({law:event.target.value})}
        {this.setState({flag:true})}
    }
    
    chooseCapital(event){
        {this.setState({capital:event.target.value})}
        {this.setState({flag:true})}
    }
    
    render() {
       
        return (
            <div>
            <div class="w-25 p-3" > 
            <Label for="exampleSelectMulti">Select Company Type</Label>
            <Input
              type="select"
              name="selectMulti"
              id="exampleSelectMulti"
              onChange={this.chooseLaw.bind(this)}
            >
            <option>Regulated Law</option>
            <option>43</option>
            <option>159</option>
            <option>73</option>
            </Input>
            <Input
              name="selectMulti"
              id="exampleSelectMulti"
              onChange={this.chooseCapital.bind(this)}
            ></Input>
          </div>
          {console.log('#1 ',this.state.flag)}
            <Bill regulatedLaw={this.state.law} capital={this.state.capital} flag={this.state.flag} changeFlag={this.changeFlag}/>
            {console.log('#2 ',this.state.flag)}
        </div>

        )
      }

}


export default tryComponent
