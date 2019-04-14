import React, { Component } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'




export class InvViewEditProfile extends Component {





  componentDidMount() {
    try{
    axios.get('http://localhost:3000/InvestorViewProfile').then(
          res => this.setState({allLaws: res.data.data}))
          console.log("i arrived")
    }catch(error){
        console.log(error)
    }  
  }



  OnClick1(event){
    console.log('here')
   event.preventDefault()  
    
try{  
    console.log('my first name is ' + this.state.firstName)
    
axios({
    method: 'put',
    url: 'http://localhost:3000/api/Investor/InvestorEditProfile',
    headers: {},
    data: {
        firstName : this.state.firstName,
        MiddleName : this.state.MiddleName,
        LastName : this.state.LastName,
        email : this.state.email,
        password : this.state.password,
        ID_type : this.state.ID_type,
        SSID : this.state.SSID,
        Nationality : this.state.Nationality,
        Type : this.state.Type,
        Address : this.state.Address,
        birthdate : this.state.birthdate,
        telephone_number : this.state.telephone_number,
        gender : this.state.gender

    }
  }).then(
  res => {console.log(res)}
  
 )


} catch(error){
console.log(error)
}  

}
 
    constructor(props) {
      super(props);
    //   this.state = {
    //     startDate: new Date()
    //   };
       this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(event) {
        console.log(event.target.name)
       console.log(event.target.value)
      this.setState({
          
           [event.target.name] : event.target.value
      });
    }



  render() {
    return (
      
        this.getState()
     
    )
  }
}

export default InvViewEditProfile
