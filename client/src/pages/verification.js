import React ,{ Component } from 'react'
import {Card , Button} from 'react-bootstrap'
import axios from "axios"


class verification extends Component  {
    state={
        userFound : false
    }
    componentWillMount(){
        console.log(this.props.match.params.tok)
      axios.put('http://localhost:3000/verify/' + this.props.match.params.tok)
            .then(res => console.log(res))
            .catch(error => console.log(error))
    }


render(){

  return(
    <Card>
      <Card.Header as="h5">Email verification</Card.Header>
      <Card.Body>
      <Card.Title>Congratulations !!</Card.Title>
      <Card.Text>
        Thank you for verifying your mail <br></br> You ready now to enjoy using our website by sign in
      </Card.Text>
      <Card.Link href="http://localhost:3001/signIn">Click here to signIn</Card.Link>
      </Card.Body>
    </Card>
    )
  
}

}

export default verification
