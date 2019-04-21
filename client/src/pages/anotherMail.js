import React ,{ Component } from 'react'
import {Card} from 'react-bootstrap'
import axios from "axios"
import jwt from 'jsonwebtoken'



class verification extends Component  {
    state={
        userFound : false
    }
    
    componentWillMount(){
        try {
        const token = this.props.match.params.tok
        const decoded = jwt.decode(token)
            axios({
                method: "put",
                url: 'http://localhost:3000/forgotpassword' ,
                data: {
                  email : decoded.email
                }
              }).then(res => console.log(res))
              .catch(error => console.log(error))
            }
            catch(e){
                
            }
    }


render(){

  return(
    <Card>
      <Card.Header as="h4">Forget Password</Card.Header>
      <Card.Body>
      <Card.Text>
      We heard that you lost your GAFI password. Sorry about that! <br></br> 
      But don’t worry! You can check your mail again and follow the steps <br />
      After , you can sign in again by click on this link  
      </Card.Text>
      <Card.Link href="http://localhost:3001/signIn">Click here to signIn</Card.Link>
      </Card.Body>
    </Card>
    )
  
}

}

export default verification
