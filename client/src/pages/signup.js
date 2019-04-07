import React ,{ Component } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'; 

class signup extends Component  {
    render(){
    return (
        <div className="App">

        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>
           <div className=".App__Aside"></div>
  
           <div className="App__Form"></div>
  
           <div className="PageSwitcher">
             {/* <a href="#" className= "PageSwitcher__Item" >Sign In</a> */}
             <a href="#" className= "PageSwitcher__Item  PageSwitcher__Item--Active">Sign Up</a>
           </div>
          
           <div className= "FormTitle">
             {/* <a href="#" className= "FormTitle__Link" >Sign In</a> or */}
             <a href="#" className= "FormTitle__Link ">Sign Up</a>
           </div>
  
           <div className= "FormCenter">
             <form className= "FormFields" onSubmit={this.handleSubmit}>
               <div className= "FormField">
                 <label className= "FormField__Label" htmlFor="name">First Name</label>
                 <input type="text" id="firstName" className="FormField__Input" placeholder="Enter your first name" name="name"/>
               </div>
  
               <div className= "FormField">
                 <label className= "FormField__Label" htmlFor="name">Middle Name</label>
                 <input type="text" id="middleName" className="FormField__Input" placeholder="Enter your middle name" name="name"/>
               </div>
  
               <div className= "FormField">
                 <label className= "FormField__Label" htmlFor="name">Last Name</label>
                 <input type="text" id="lastName" className="FormField__Input" placeholder="Enter your last name" name="name"/>
               </div>
  
               <div className= "FormField">
                 <label className= "FormField__Label" htmlFor="name">Email</label>
                 <input type="text" id="email" className="FormField__Input" placeholder="Enter your Email Address" name="name"/>
               </div>
  
               <div className= "FormField">
                 <label className= "FormField__Label" htmlFor="name">Password</label>
                 <input type="text" id="password" className="FormField__Input" placeholder="Enter your Password" name="name"/>
               </div>
  
              {/* CHECK BOX */}
               <div className= "FormField">
                 <label className= "FormField__Label" htmlFor="name">ID type</label>
                 <input type="text" id="ID_type" className="FormField__Input" placeholder="Enter your Password" name="name"/>
               </div>
  
               <div className= "FormField">
                 <label className= "FormField__Label" htmlFor="name">SSID</label>
                 <input type="text" id="SSID" className="FormField__Input" placeholder="Enter your Social Security ID" name="name"/>
               </div>
  
               <div className= "FormField">
                 <label className= "FormField__Label" htmlFor="name">Nationality</label>
                 <input type="text" id="Nationality" className="FormField__Input" placeholder="Enter your Nationality" name="name"/>
               </div>
  
                {/* CHECK BOX */}
                <div className= "FormField">
               <label className= "FormField__Label" htmlFor="name">Type</label>
               <div class="btn-group btn-group-toggle" data-toggle="buttons">
    <label class="btn btn-secondary active">  
      <input type="radio" name="options" id="option1" autocomplete="off"/> Investor
    </label>
    <label class="btn btn-secondary">
      <input type="radio" name="options" id="option2" autocomplete="off"/> Company
    </label>
  </div>
  </div>
               
  
               <div className= "FormField">
                 <label className= "FormField__Label" htmlFor="name">Address</label>
                 <input type="text" id="Address" className="FormField__Input" placeholder="Enter your Address" name="name"/>
               </div>
               
               {/* Date */}
               <div className= "FormField">
                 <label className= "FormField__Label" htmlFor="name">Birth-Date</label>
                 <input type="text" id="birthdate" className="FormField__Input" placeholder="Enter your Password" name="name"/>
               </div>
               
  
               <div className= "FormField">
                 <label className= "FormField__Label" htmlFor="name">Telephone Number</label>
                 <input type="text" id="telephone_number" className="FormField__Input" placeholder="Enter your Telephone Number " name="name"/>
               </div>
               <div className= "FormField">
               <label className= "FormField__Label" htmlFor="name">Gender</label>
               <div class="btn-group btn-group-toggle" data-toggle="buttons">
    <label class="btn btn-secondary active">
      <input type="radio" name="options" id="option1" autocomplete="off"/> Male
    </label>
    <label class="btn btn-secondary">
      <input type="radio" name="options" id="option2" autocomplete="off"/> Female
    </label>
  </div>
  </div>
    <div class="form-group">
    <label class="FormField__Label">Upload profile picture</label>
      <input type="file" class="btn btn-outline-secondary" id="pp"/>
    </div>
             </form>
           </div>
           
  
        </div>
        
  )
  
    }
}






export default signup;