import React, { Component } from 'react';
import { Button, ButtonToolbar, ButtonGroup ,Form} from 'react-bootstrap'
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'

class SignUp extends Component {
  myFunction(event) {
    console.log('hiiii')
      var x = document.getElementById("password");
      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
      }
    } 
  

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
         <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css"/>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>

<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous"/>
          {/* <div className=".App__Aside"></div> */}
  
           {/* <div className="App__Form"></div> */}
  
            {/* <div className="PageSwitcher">  */}
            {/* </div>   */}
          
           {/* <div className= "FormTitle">
            
             <a href="#" className= "FormTitle__Link "  OnClick ={this.OnClick.bind(this)}>Sign Up</a>
           </div> */}
  
         
         <div className= "FormCenter"> 
             <form className= "FormFields"  onSubmit={this.OnClick1.bind(this)}>
            <h1> <Form.Label className="label label-primary">WELCOME</Form.Label> </h1>
            <br></br>
             <p> 
             <div className= "FormCenter">
                 <label className= "FormField__Label" htmlFor="name"  > <b>First Name  &nbsp;&nbsp; </b></label> 
                 <input type="text" id="firstName" className="FormField__Input"  name="firstName" onChange = {this.handleChange.bind(this)} /> {/*placeholder="Enter your first name" */}
                 <span  class="fas fa-pencil-alt" style={{ fontSize: '1.50em' }}></span> </div>
            </p>


             <p> 
             <div className= "FormField">
                 <label className= "FormField__Label" htmlFor="name"><b>Middle Name  </b> </label>  
                 <input type="text" id="middleName" className="FormField__Input"  name="MiddleName" onChange = {this.handleChange.bind(this)} /> {/*placeholder="Enter your middle name" */}
                 <span  class="fas fa-pencil-alt" style={{ fontSize: '1.50em' }}></span></div>
             </p> 


             <p>
             <div className= "FormField">
                 <label className= "FormField__Label" htmlFor="name"><b>Last Name &nbsp;&nbsp;&nbsp;</b> </label> 
                 <input type="text" id="lastName" className="FormField__Input"  name="LastName" onChange = {this.handleChange.bind(this)}/> {/*placeholder="Enter your last name" */}
                 <span  class="fas fa-pencil-alt" style={{ fontSize: '1.50em' }}></span></div>
            </p>

         
            <p> 
            <div className= "FormField">
                 <label className= "FormField__Label" htmlFor="name"><b>E-mail &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </b></label> 
                 <input type="text" id="email" className="FormField__Input"  name="email" onChange = {this.handleChange.bind(this)}/> {/*placeholder="Enter your Email Address" */}
                 <span  class="fas fa-envelope" style={{ fontSize: '1.50em' }}></span></div>
            </p> 


            <p> 
            <div className= "FormField">
                 <label className= "FormField__Label" htmlFor="name"><b>Password &nbsp;&nbsp;&nbsp;&nbsp;</b></label>
                 <input type="text" id="password" className="FormField__Input"  type="Password"  name="password" onChange = {this.handleChange.bind(this)}/> {/*placeholder="Enter your Password" */}
                 <span   class="fas fa-key" style={{ fontSize: '1.50em' }}></span> <br/>
                 
            </div>
            
                 <input type="checkbox" onClick={this.myFunction.bind(this)}/>Show Password
            </p> 

          

            <p> 
            <div className= "FormField">
                 <label className= "FormField__Label" htmlFor="name"><b>SSID &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></label>
                 <input type="text" id="SSID" className="FormField__Input"  name="SSID" onChange = {this.handleChange.bind(this)}/> {/*placeholder="Enter your Social Security ID" */}
                 <span class="far fa-id-card" style={{ fontSize: '1.50em' }}></span> </div>
            </p> 


               <p>
               <div className= "FormField">
                 <label className= "FormField__Label" htmlFor="name"><b>Nationality &nbsp;&nbsp;</b></label> 
                 <input type="text" id="Nationality" className="FormField__Input"  name="Nationality" onChange = {this.handleChange.bind(this)}/> {/*placeholder="Enter your Nationality" */}
                 <span class="fas fa-flag" style={{ fontSize: '1.50em' }}></span> </div>
               </p>


               <p>
               <div className= "FormField">
                 <label className= "FormField__Label" htmlFor="name"><b>ID-Type &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></label> 
                 <input type="text" id="Nationality" className="FormField__Input" name="Type" onChange = {this.handleChange.bind(this)}/> <span  class="fas fa-passport" style={{ fontSize: '1.50em' }}></span> <br/> {/* placeholder="Enter your ID-Type" */}
                  
                 <label className= "FormField__Label" htmlFor="name"><i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Either Passport or National ID</i></label>
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
                 <label className= "FormField__Label" htmlFor="name"><b>Address &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></label> 
                 <input type="text" id="Address" className="FormField__Input"  name="Address"  onChange = {this.handleChange.bind(this)}/> {/*placeholder="Enter your Address" */}
                 <span class="fas fa-map-marker-alt" style={{ fontSize: '1.50em' }}></span>  </div>
            </p> 


               <p>
               <div className= "FormField">
                 <label className= "FormField__Label" htmlFor="name"><b>Birth-Date </b></label> 
                 <input type="text" id="Nationality" className="FormField__Input" name="birthdate" onChange = {this.handleChange.bind(this)}/> <br/> {/* placeholder="Enter Birth-Date " */}
                 <label className= "FormField__Label" htmlFor="name"><i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In the format dd-mm-yyyy</i> </label>
                 {/* <span  class="fas fa-calendar-week"> style={{ fontSize: '1.50em' }}></span> */}
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
                 <label className= "FormField__Label" htmlFor="name"><b>Number &nbsp;&nbsp;</b></label> 
                  <input type="text" id="telephone_number" className="FormField__Input"  name="telephone_number"  onChange = {this.handleChange.bind(this)}/> {/* placeholder="Enter your phone Number " */}
                  {/* <span   class="fas fa-phone-square"> style={{ fontSize: '1.50em' }}></span> */}
            </div> </p> 


             <p>
             <div className= "FormField">
                 <label className= "FormField__Label" htmlFor="name"><b>Gender &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></label> 
                 <input type="text" id="Nationality" className="FormField__Input" name="gender" onChange = {this.handleChange.bind(this)}/>  {/* placeholder="Male/Female"*/}
                 <span  class="fas fa-venus-mars" style={{ fontSize: '1.50em' }}></span>
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



