import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

class LawyerForm extends Component {
    state={
        formType:'',
        regulatedLaw:'',
        legalForm:'',
        arabicName:'',
        englishName:'',
        governorate:'',
        city:'',
        address:'',
        telephone:'',
        fax:'',
        currency:'',
        equityCapital:'',
        fees:'',
        investorFirstName:'',
        investorMiddleName:'',
        investorLastName:'',
        investorType:'',
        investorGender:'',
        investorNationality:'',
        investorIdType:'',
        investorSSID:'',
        investorBirthdate:'',
        investorAddress:'',
        investorTelephone:'',
        investorFax:'',
        investorEmail:'' ,
        mname:'',
        mtype:'',
        mgender:'',
        mnationality:'',
        midType:'',
        mSSID:'',
        mbirthdate:'',
        maddress:'',
        mposition:''
        
    }
    handleUserInput = (e) => {
       // const name = e.target.name;
        //const value = e.target.value;
        this.setState({[e.target.name]:e.target.value})
      }



      methodcall() {


            

            axios({
                method: 'POST',
                url:'http://localhost:3000/LawyerFillForm',
                headers : new Headers(),
                data:{form_type: this.state.formType,
                regulated_law: this.state.regulatedLaw,
                arabic_name: this.state.arabicName,
                english_name: this.state.englishName,
                government: this.state.governorate,
                city: this.state.city,
                address: this.state.address,
                main_center_phone: this.state.telephone,
                main_center_fax: this.state.fax,
                currency: this.state.currency,
                equality_capital: this.state.equityCapital,
                fees:this.state.fees,}
            }).then((res) => res.json())
            .then((data) =>  console.log(data))
            .catch((err)=>console.log(err))
        

        }

        
        
        
        
        



    render() {
        

        return( 
            <div>
                <h1>  Company Form </h1>

                <Form>
                <Form.Group as={Col} controlId="formGridState">
      <Form.Label>Form Type</Form.Label>
      <Form.Control as="select" name='formType' onChange={this.handleUserInput.bind(this)}>
        <option>SSC</option>
        <option>SPC</option>
      </Form.Control>
    </Form.Group>

  <Form.Row>
  <Form.Group as={Col} controlId="formGridState">
      <Form.Label>Regulated Law</Form.Label>
      <Form.Control as="select" name='regulatedLaw' onChange={this.handleUserInput.bind(this)}>
        <option>159</option>
        <option>72</option>
      </Form.Control>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridState">
      <Form.Label>Legal Form</Form.Label>
      <Form.Control as="select" name='legalForm' onChange={this.handleUserInput.bind(this)}>
        <option>Choose...</option>
        <option>...</option>
      </Form.Control>
    </Form.Group>
  </Form.Row>


  <Form.Row>
  <Form.Group as={Col} controlId="formGridState">
      <Form.Label>Company English Name</Form.Label>
      <Form.Control /*placeholder="Enter the Company's English Name" */ name='englishName' onInput={this.handleUserInput.bind(this)}/>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridState">
      <Form.Label>Company Arabic Name</Form.Label>
      <Form.Control /*placeholder="Enter the Company's Arabic Name" */ name='arabicName' onInput={this.handleUserInput.bind(this)}/>
    </Form.Group>
  </Form.Row>


  <Form.Row>
    <Form.Group as={Col} controlId="formGridAddress1">
      <Form.Label>Governorate</Form.Label>
      <Form.Control as="select" name='governorate' onInput={this.handleUserInput.bind(this)}>
        <option>Choose...</option>
        <option>...</option>
      </Form.Control>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridAddress2">
    <Form.Label>City</Form.Label>
    <Form.Control as="select" name='city' onInput={this.handleUserInput.bind(this)}>
        <option>Choose...</option>
        <option>...</option>
      </Form.Control>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridAddress3">
    <Form.Label>Address</Form.Label>
      <Form.Control placeholder="Address 3"  name='address' onInput={this.handleUserInput.bind(this)}/>
    </Form.Group>
  </Form.Row>


  <Form.Row>
    <Form.Group as={Col} controlId="formGridState">
    <Form.Label>Company Telephone</Form.Label>
    <Form.Control  name='telephone' onInput={this.handleUserInput.bind(this)}/>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridZip">
      <Form.Label>Company Fax</Form.Label>
      <Form.Control name='fax' onInput={this.handleUserInput.bind(this)} />
    </Form.Group>
  </Form.Row>

  <Form.Row>
    <Form.Group as={Col} controlId="formGridState">
    <Form.Label>Currency</Form.Label>
    <Form.Control as="select" name='currency' onChange={this.handleUserInput.bind(this)}>
        <option>Choose...</option>
        <option>...</option>
      </Form.Control>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridZip">
      <Form.Label>Equity Capital</Form.Label>
      <Form.Control name='equityCapital' onInput={this.handleUserInput.bind(this)} />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridState">
    <Form.Label>Fees</Form.Label>
    <Form.Control  name='fees' onChange={this.handleUserInput.bind(this)}/>
    </Form.Group>
  </Form.Row>

  INVESTOR INFO

  <Form.Row>
    <Form.Group as={Col} controlId="formGridState">
    <Form.Label>First Name</Form.Label>
    <Form.Control   name='investorFirstName' onInput={this.handleUserInput.bind(this)}/>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridState">
    <Form.Label>Middle Name</Form.Label>
    <Form.Control  name='investorMiddleName' onInput={this.handleUserInput.bind(this)}/>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridZip">
      <Form.Label>Last Name</Form.Label>
      <Form.Control  name='investorLastName' onInput={this.handleUserInput.bind(this)}/>
    </Form.Group>
  </Form.Row>

  <Form.Group controlId="formGridAddress1">
    <Form.Label>Investor Type</Form.Label>
    <Form.Control as="select" name='investorType' onInput={this.handleUserInput.bind(this)}>
        <option>Choose...</option>
        <option>...</option>
      </Form.Control>
  </Form.Group>

  <Form.Group controlId="formGridAddress1">
    <Form.Label>Gender</Form.Label>
    <Form.Control as="select" name='investorGender' onInput={this.handleUserInput.bind(this)}>
        <option>Female</option>
        <option>Male</option>
      </Form.Control>
  </Form.Group>

  <Form.Group controlId="formGridAddress1">
    <Form.Label>Nationality</Form.Label>
    <Form.Control as="select" name='investorInvestor' onInput={this.handleUserInput.bind(this)}>
        <option>Choose...</option>
        <option>...</option>
      </Form.Control>
  </Form.Group>

  <Form.Group controlId="formGridAddress1">
    <Form.Label>ID Type</Form.Label>
    <Form.Control as="select" name='investorIdType' onInput={this.handleUserInput.bind(this)}>
        <option>Choose...</option>
        <option>...</option>
      </Form.Control>
  </Form.Group>

  <Form.Group controlId="formGridAddress1">
    <Form.Label>SSID</Form.Label>
    <Form.Control  name='investorSSID' onInput={this.handleUserInput.bind(this)}/>
  </Form.Group>

  <Form.Group controlId="formGridAddress1">
    <Form.Label>Birthdate</Form.Label>
    <Form.Control name='investorBirthdate' onInput={this.handleUserInput.bind(this)} />
        
  </Form.Group>

  <Form.Group controlId="formGridAddress1">
    <Form.Label>Address</Form.Label>
    <Form.Control  name='investorAddress' onInput={this.handleUserInput.bind(this)} />
  </Form.Group>

  <Form.Group controlId="formGridAddress1">
    <Form.Label>Telephone No.</Form.Label>
    <Form.Control  name='investorTelephone' onInput={this.handleUserInput.bind(this)} />
  </Form.Group>

  <Form.Group controlId="formGridAddress1">
    <Form.Label>Fax No.</Form.Label>
    <Form.Control  name='investorFax' onInput={this.handleUserInput.bind(this)}/>
  </Form.Group>

  <Form.Row>
    <Form.Group as={Col} controlId="formGridState">
    <Form.Label>Email</Form.Label>
    <Form.Control  name='investorEmail' onInput={this.handleUserInput.bind(this)} />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridZip">
      <Form.Label>Password</Form.Label>
      <Form.Control name='investorPassword' onInput={this.handleUserInput.bind(this)}/>
    </Form.Group>
  </Form.Row>

  MANAGERS INFO

  
    <Form.Group as={Col} controlId="formGridState">
    <Form.Label>Manager Name</Form.Label>
    <Form.Control   name='mname' onInput={this.handleUserInput.bind(this)}/>
    </Form.Group>

    <Form.Group controlId="formGridAddress1">
    <Form.Label>Manager Type</Form.Label>
    <Form.Control as="select" name='mtype' onInput={this.handleUserInput.bind(this)}>
        <option>Choose...</option>
        <option>...</option>
      </Form.Control>
  </Form.Group>

  <Form.Group controlId="formGridAddress1">
    <Form.Label>Manager Gender</Form.Label>
    <Form.Control as="select" name='mgender' onInput={this.handleUserInput.bind(this)}>
        <option>Choose...</option>
        <option>...</option>
      </Form.Control>
  </Form.Group>
  <Form.Group controlId="formGridAddress1">
    <Form.Label>Manager Nationality</Form.Label>
    <Form.Control as="select" name='mnationality' onInput={this.handleUserInput.bind(this)}>
        <option>Choose...</option>
        <option>...</option>
      </Form.Control>
  </Form.Group>
  <Form.Group controlId="formGridAddress1">
    <Form.Label>ID Type</Form.Label>
    <Form.Control as="select" name='midType' onInput={this.handleUserInput.bind(this)}>
        <option>Choose...</option>
        <option>...</option>
      </Form.Control>
  </Form.Group>










    <Form.Group as={Col} controlId="formGridZip">
      <Form.Label>Manager Type</Form.Label>
      <Form.Control  name='mtype' onInput={this.handleUserInput.bind(this)}/>
    </Form.Group>

    





  

  <Form.Group id="formGridCheckbox">
    <Form.Check type="checkbox" label="I'm SURE" />
  </Form.Group>

  <Button variant="primary" type="submit"  onClick={this.methodcall.bind(this)}>
    Submit
  </Button>
</Form>;

            </div>
                
                
                 

        );
    }


    









}




      
       
  
        

    
  
  
  export default LawyerForm;