import React, { Component } from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'

export class InvViewProfile extends Component {

    state ={
        firstName : '',
        MiddleName : '',
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
  render() {
    return (
        <Table striped bordered hover>
        < thead>
       <tr>
         <th>Field</th>
         <th>Value</th>
        
       </tr>
     </thead>
   
     <tbody>
       <tr>
         <td>First Name</td>
         <td>  <Form.Text className="text-muted" >
         {this.state.firstName} </Form.Text>
         </td> 
       </tr>
   
       <tr>
       <td>Middle Name</td>
         <td> <Form.Text className="text-muted" >
         {this.state.MiddleName} </Form.Text>
      </td>
      </tr>
         
   
       <tr>
       <td>Last Name</td>
         <td><Form.Text className="text-muted" >
         {this.state.LastName} </Form.Text>
       </td>
       </tr>
         
   
       <tr>
       <td>E-mail</td>
         <td> <Form.Text className="text-muted" >
         {this.state.email} </Form.Text>
        </td>
       </tr>
   
   
       <tr>
       <td>password</td>
         <td><Form.Text className="text-muted" >
         {this.state.password} </Form.Text>
        </td>
       </tr>
   
   
       <tr>
       <td>ID-Type</td>
         <td><Form.Text className="text-muted" >
         {this.state.ID_type} </Form.Text>
         </td>
       </tr>
   
   
       <tr>
       <td>SSID</td>
         <td><Form.Text className="text-muted" >
         {this.state.SSID} </Form.Text>
         </td>
       </tr>
   
       <tr>
       <td>Nationality</td>
         <td><Form.Text className="text-muted" >
         {this.state.Nationality} </Form.Text>
      </td>
       </tr>
   
       <tr>
       <td>Address</td>
         <td><Form.Text className="text-muted" > 
         {this.state.Address} </Form.Text>

        </td>
       </tr>
   
        <tr>
       <td>Birth-Date</td>
         <td><Form.Text className="text-muted">
         {this.state.birthdate} </Form.Text>
        
        </td>
       </tr> 
   
       <tr>
       <td>Telephone Number</td>
         <td><Form.Text className="text-muted" >
         {this.state.telephone_number} </Form.Text>

         </td> 
       </tr>
   
       <tr>
       <td>Gender</td>
         <td><Form.Text className="text-muted" >
         {this.state.gender}</Form.Text>

      </td> 
       </tr>
       
     </tbody>
         
         
         </Table>
         
          
        
    )
  }
}

export default InvViewProfile
