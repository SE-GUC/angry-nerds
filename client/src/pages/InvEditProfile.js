import React, { Component } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import UploadPic from '../components/UploadPic';




export class InvViewEditProfile extends Component {

    // constructor(props) {
    //   super(props);
    // //   this.state = {
    // //     startDate: new Date()
    // //   };
    //    this.handleChange = this.handleChange.bind(this);
    // }


state ={
        firstName : '',
        MiddleName : '',
        //isEditable2:fasle,
        LastName : '',
        email :'',
        password : '',
        ID_type :'',
        SSID : '',
        Nationality :'',
        Address : '',
        birthdate : '',
        telephone_number : '',
        gender : ''


}
handleChangeEdit(e) {
  console.log('got here')
  this.setState({isEditable2:'true'})
}



  componentDidMount() {
    try{
      axios({
      method: 'get',
      url: 'http://localhost:3000/InvestorViewProfile',
      headers: {},
      data: {
      }
    }) .then(res => {
        console.log('res =====>>>>', res)
       this.setState({
        firstName : res.data.data.firstName,
        MiddleName : res.data.data.MiddleName,
        LastName : res.data.data.LastName,
        email :res.data.data.email,
        password : res.data.data.password,
        ID_type :res.data.data.ID_type,
        SSID : res.data.data.SSID,
        Nationality :res.data.data.Nationality,
        Address : res.data.data.Address,
        birthdate : res.data.data.birthdate,
        telephone_number : res.data.data.telephone_number,
        gender : res.data.data.gender
      })
        console.log(this.state.gender)
    })
              
  }catch(error){
          console.log(error)
      }  

}




  OnClick1(event){
   console.log('here')
   event.preventDefault()  
    
try{  
    
    
axios({
    method: 'put',
    url: 'http://localhost:3000/InvestorEditProfile',
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
 console.log('my first name is ' + this.state.firstName)


} catch(error){
console.log(error)
}  

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
      <div>
        <UploadPic/>
      
      <Table striped bordered hover>
     < thead>
    <tr>
      <th>Field</th>
      <th>Value</th>
      <th>Edit</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>First Name</td>
      <td>  <Form.Control className="text-muted" placeholder={this.state.firstName}    onChange = {this.handleChange.bind(this)}/>
      </td>
      <td> <Button variant="outline-secondary"  onClick ={this.handleChangeEdit}>Edit Field</Button></td>
    </tr>

    <tr>
    <td>Middle Name</td>
      <td> <Form.Control className="text-muted" placeholder={this.state.MiddleName}   onChange = {this.handleChange.bind(this)}/>
   </td>
      <td> <Button variant="outline-secondary">Edit Field</Button></td>
    </tr>

    <tr>
    <td>Last Name</td>
      <td><Form.Control className="text-muted" placeholder={this.state.LastName}   onChange = {this.handleChange.bind(this)}/>
    </td>
      <td> <Button variant="outline-secondary">Edit Field</Button></td>
    </tr>

    <tr>
    <td>E-mail</td>
      <td> <Form.Control className="text-muted" placeholder= {this.state.email}   onChange = {this.handleChange.bind(this)}/>
     </td>
      <td> <Button variant="outline-secondary">Edit Field</Button></td>
    </tr>


    <tr>
    <td>password</td>
      <td><Form.Control className="text-muted" placeholder={this.state.password}  onChange = {this.handleChange.bind(this)}/>
     </td>
      <td> <Button variant="outline-secondary">Edit Field</Button></td>
    </tr>


    <tr>
    <td>ID-Type</td>
      <td><Form.Control className="text-muted" placeholder={this.state.ID_type}  onChange = {this.handleChange.bind(this)}/>
      </td>
      <td> <Button variant="outline-secondary">Edit Field</Button></td>
    </tr>


    <tr>
    <td>SSID</td>
      <td><Form.Control className="text-muted" placeholder={this.state.SSID}  onChange = {this.handleChange.bind(this)}/>
      </td>
      <td> <Button variant="outline-secondary">Edit Field</Button></td>
    </tr>

    <tr>
    <td>Nationality</td>
      <td><Form.Control className="text-muted" placeholder={this.state.Nationality}  onChange = {this.handleChange.bind(this)}/>
   </td>
      <td> <Button variant="outline-secondary">Edit Field</Button></td>
    </tr>

    <tr>
    <td>Address</td>
      <td><Form.Control className="text-muted" placeholder={this.state.Address}  onChange = {this.handleChange.bind(this)}/> 
     </td>
      <td> <Button variant="outline-secondary">Edit Field</Button></td>
    </tr>

    <tr>
    <td>Birth-Date</td>
      <td><Form.Control className="text-muted" placeholder= {this.state.birthdate}  onChange = {this.handleChange.bind(this)}/>
     </td>
      <td> <Button variant="outline-secondary">Edit Field</Button></td>
    </tr>

    <tr>
    <td>Telephone Number</td>
      <td><Form.Control className="text-muted" placeholder={this.state.telephone_number}  onChange = {this.handleChange.bind(this)}/>
      </td>
      <td> <Button variant="outline-secondary">Edit Field</Button></td>
    </tr>

    <tr>
    <td>Gender</td>
      <td><Form.Control className="text-muted" placeholder={this.state.gender}  onChange = {this.handleChange.bind(this)}/>
   </td>
      <td> <Button variant="outline-secondary">Edit Field</Button></td>
    </tr>
    
  </tbody>

  <Button variant="primary" onClick ={this.OnClick1.bind(this)}>Submit</Button>
      
      
      </Table>
      
       </div>
     
    )
  }
}

export default InvViewEditProfile
