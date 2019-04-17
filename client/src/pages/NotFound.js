import React ,{ Component } from 'react'
const color = {backgroundColor: '#286090'};

class NotFound extends Component  {
    openForm(event) {
        document.getElementById("myForm").style.display = "block";
        document.getElementById("button1").disabled = true
      }
      
    closeForm() {
        console.log('hi')
        document.getElementById("myForm").style.display = "none";
      }
    render(){
    return (
        <React.Fragment>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css"/>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
<div>
<div class="form-popup" id="myForm">
  <form action="/action_page.php" class="form-container">
    <label for="email"><b>Enter Investor name to confirm deletion</b></label>
    <input type="text" placeholder="Enter Email" name="email" required/>


    <button type="submit" class="btn">Login</button>
    <button type="submit" class="btn cancel" onclick="closeForm()">Close</button>
  </form>
  </div>
  <button type="submit" onClick={this.openForm.bind(this)}>View</button>
  <br></br>
  <h1> </h1>
  <button type="submit" id="button1"onClick={this.closeForm.bind(this)} >Hide</button>

</div>
</React.Fragment>
)
  
    }
}






export default NotFound;