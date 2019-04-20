import React, { Component } from 'react'
import {Button} from 'react-bootstrap';
import axios from 'axios';


export class UploadPic extends Component {

state = { selectedFile: null }

fileChangedHandler = event => {
  this.setState({ selectedFile: event.target.files[0] })
}

uploadHandler = () => {
    const file = new FormData()
    file.append(
      'file',
      this.state.selectedFile,
      this.state.selectedFile.name
    )
    try {
        axios.post(`http://localhost:3000/upload/5c7aee579c27c860c43d54b9`,  file )
          .then(res => {
            console.log(res);
            console.log(res.data);
          }) }
          catch(e){
            console.log(e)
          } 
        
    

        
        
        }
      
fileSelectHandler = event => {
console.log(event.target.files[0]);
}

  render() {
    return (
      <div>
        <h1> Upload Profile Picture</h1>

        <input type="file" onChange={this.fileChangedHandler}/>
        <Button variant="outline-secondary"  type="submit"  onClick={this.uploadHandler}  >UPLOAD</Button>

       {/* <img src={this.state.multerImage} alt="upload-image" className="process__image" />   */}

       {/* <img src={ require('http://localhost:3000/image/8a69e599ac673813f215fb9ab2965b6d.jpeg') } /> */}




      </div>

      
    )
  }
}

export default UploadPic
