import React, { Component } from 'react';
import { Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'


class SignUp extends Component {


// async submit (event){
//     event.preventDefault
// }
OnClick1(event){
    console.log('here')
   event.preventDefault()  
    
try{  
    console.log('my first name is ' + this.state.firstName)
    
axios({
    method: 'post',
    url: 'http://localhost:3000/api/Investor/register',
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
        <div className="App">
           <div className=".App__Aside"></div>
  
           <div className="App__Form"></div>
  
            <div className="PageSwitcher"> 
            </div>  
          
           {/* <div className= "FormTitle">
            
             <a href="#" className= "FormTitle__Link "  OnClick ={this.OnClick.bind(this)}>Sign Up</a>
           </div> */}
  
         
           <div className= "FormCenter">
             <form className= "FormFields"  onSubmit={this.OnClick1.bind(this)}>
             <p> 
               <div className= "FormField">
                 <label className= "FormField__Label" htmlFor="name">First Name</label> <br/>
                 <input type="text" id="firstName" className="FormField__Input" placeholder="Enter your first name" name="firstName" onChange = {this.handleChange.bind(this)} />
               </div>
        </p>


            <p> 
               <div className= "FormField">
                 <label className= "FormField__Label" htmlFor="name">Middle Name</label> <br/>
                 <input type="text" id="middleName" className="FormField__Input" placeholder="Enter your middle name" name="MiddleName" onChange = {this.handleChange.bind(this)}/>
               </div>
             </p> 

             <p>
               <div className= "FormField">
                 <label className= "FormField__Label" htmlFor="name">Last Name</label> <br/>
                 <input type="text" id="lastName" className="FormField__Input" placeholder="Enter your last name" name="LastName" onChange = {this.handleChange.bind(this)}/>
               </div>
            </p>
         
            <p> 
               <div className= "FormField">
                 <label className= "FormField__Label" htmlFor="name">Email</label> <br/>
                 <input type="text" id="email" className="FormField__Input" placeholder="Enter your Email Address" name="email" onChange = {this.handleChange.bind(this)}/>
               </div>

            </p> 

            <p> 
               <div className= "FormField">
                 <label className= "FormField__Label" htmlFor="name">Password</label><br/>
                 <input type="text" id="password" className="FormField__Input" placeholder="Enter your Password" name="password" onChange = {this.handleChange.bind(this)}/>
               </div>

            </p> 


            <p> 
               <div className= "FormField">
                 <label className= "FormField__Label" htmlFor="name">SSID</label><br/>
                 <input type="text" id="SSID" className="FormField__Input" placeholder="Enter your Social Security ID" name="SSID" onChange = {this.handleChange.bind(this)}/>
               </div>

               </p> 

               <p>
                   <div className= "FormField">
                 <label className= "FormField__Label" htmlFor="name">Nationality</label> <br/>
                 <input type="text" id="Nationality" className="FormField__Input" placeholder="Enter your Nationality" name="Nationality" onChange = {this.handleChange.bind(this)}/> 
               </div>
               </p>




               <p>
                   <div className= "FormField">
                 <label className= "FormField__Label" htmlFor="name">ID-Type</label> <br/>
                 <input type="text" id="Nationality" className="FormField__Input" placeholder="Enter your ID-Type" name="Type" onChange = {this.handleChange.bind(this)}/> <br/>
                 <label className= "FormField__Label" htmlFor="name">Either Passport or National ID</label>
               </div>
               </p>
            

              {/* <p>
              <div className= "FormField">
               <label className= "FormField__Label" htmlFor="name">ID-type</label>
               <ButtonToolbar>
                 <Button variant="outline-primary" onChange = {this.handleChange.bind(this)}>Passport  </Button>
                 <Button variant="outline-secondary" onChange = {this.handleChange.bind(this)}>National ID </Button>
                 
               </ButtonToolbar>
               
               </div>
               
              </p> */}
               
               <p> 
               <div className= "FormField">
                 <label className= "FormField__Label" htmlFor="name">Address</label> <br/>
                 <input type="text" id="Address" className="FormField__Input" placeholder="Enter your Address" name="Address"  onChange = {this.handleChange.bind(this)}/> 
               </div>
               </p> 

               <p>
                   <div className= "FormField">
                 <label className= "FormField__Label" htmlFor="name">Birth-Date</label> <br/>
                 <input type="text" id="Nationality" className="FormField__Input" placeholder="Enter Birth-Date " name="birthdate" onChange = {this.handleChange.bind(this)}/> <br/>
                 <label className= "FormField__Label" htmlFor="name"> In the format dd-mm-yyyy</label>
                
               </div>
               
               </p>




               {/* <div className= "FormField">
                 <label className= "FormField__Label" htmlFor="name" onChange = {this.handleChange.bind(this)}>Birth-Date</label>
               <DatePicker
                 selected={this.state.startDate}
                 
               />  
               </div> */}
              <p> 
               <div className= "FormField">
                 <label className= "FormField__Label" htmlFor="name">Telephone Number</label> <br />
                 <input type="text" id="telephone_number" className="FormField__Input" placeholder="Enter your phone Number " name="telephone_number"  onChange = {this.handleChange.bind(this)}/>
               </div>
               </p> 


               <p>
                   <div className= "FormField">
                 <label className= "FormField__Label" htmlFor="name">Gender</label> <br/>
                 <input type="text" id="Nationality" className="FormField__Input" placeholder="Male/Female" name="gender" onChange = {this.handleChange.bind(this)}/>
                
               </div>
               </p>
               {/* <div className= "FormField">
                <label className= "FormField__Label" htmlFor="name">Gender</label>
                <ButtonGroup>
                   <Button active onChange = {this.handleChange.bind(this)} >Male</Button>
                   <Button  onChange = {this.handleChange.bind(this)}>Female</Button>
                </ButtonGroup> */}



               {/* <Button variant="outline-primary" onChange = {this.handleChange.bind(this)}>Male</Button>
               <Button variant="outline-secondary" onChange = {this.handleChange.bind(this)}>Female</Button> */}
              {/* </div> */}
  
              
              <Button variant="primary" onClick ={this.OnClick1.bind(this)}>Sign up</Button>
  
             </form>
           </div>
  
        </div>
      );
    }
  


}
  

export default SignUp;