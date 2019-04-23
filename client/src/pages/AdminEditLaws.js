import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col'
import  Button  from "react-bootstrap/Button";
import  ButtonToolbar  from "react-bootstrap/ButtonToolbar";
import axios from 'axios'

export class AdminEditLaws extends Component {
  state = {
    law: {
      LawNumber: 0,
      fixedValues: [],
      percentages: []
    }
  };

  componentDidMount() {
    this.setState({ law: this.props.location.state.law });
  }

  editLaw(e, index, field, subfield) {
    let _law = this.state.law;
    _law[field][index][subfield] = e.target.value;
    this.setState({ law: _law });
  }

  deleteRow(e,field,index){
      console.log(this.state.law)
      console.log('delete ',field,' ',index)
      let _law = this.state.law
      _law[field].splice(index, 1)
      console.log(_law)
      this.setState({law: _law})

  }

  addRow(e,field){
    let _law = this.state.law
    _law[field].push((field === 'fixedValues')?
        {description: '',
        value: 0}
        :
        {value: 0,
        min: 0,
        max: 0,
        description: ''})

    console.log(_law)
    this.setState({law: _law})    
  }

  applyChanges(e){
    axios.put('http://localhost:3000/AdminChangePricingStrategy/' + this.state.law._id,{fixedValues: this.state.law.fixedValues, percentages: this.state.law.percentages}).then(
        res => {
            console.log(res)
            this.props.history.push('/AdminViewLaws')
        }
    )
    this.props.history.push('/AdminViewLaws')
  }

  cancelChanges(e){
    this.props.history.push('/AdminViewLaws')
  }

  render() {
    console.log(this.props.location.state.law);
    return (
      <div>
        <h1> Law {this.state.law.LawNumber} </h1>
        <h3> Fixed Values </h3>
        <Form>
          {this.state.law.fixedValues.map((fixedValue, index) => {
            return (
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    onChange={e =>
                      this.editLaw(e, index, "fixedValues", "description")
                    }
                    placeholder={fixedValue.description}
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Value</Form.Label>
                  <Form.Control
                    onChange={e =>
                      this.editLaw(e, index, "fixedValues", "value")
                    }
                    placeholder={fixedValue.value}
                  />
                </Form.Group>
                <div className='d-flex align-items-center'>
                <button type="button" class="close" aria-label="Close"
                onClick={(e) => this.deleteRow(e,'fixedValues',index)}
                >
                 <span aria-hidden="true">&times;</span>
              </button>
              </div>
              </Form.Row>
            );
          })}
          <Button onClick={(e) => this.addRow(e,'fixedValues')}>Add</Button>
        </Form>

        <h3> Percentages </h3>
        <Form>
          {this.state.law.percentages.map((percentage, index) => {
            return (
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Value</Form.Label>
                  <Form.Control
                    onChange={e =>
                      this.editLaw(e, index, "percentages", "value")
                    }
                    placeholder={percentage.value}
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Maximum</Form.Label>
                  <Form.Control
                    onChange={e => this.editLaw(e, index, "percentages", "max")}
                    placeholder={percentage.max}
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Minimum</Form.Label>
                  <Form.Control
                    onChange={e => this.editLaw(e, index, "percentages", "min")}
                    placeholder={percentage.min}
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    onChange={e =>
                      this.editLaw(e, index, "percentages", "description")
                    }
                    placeholder={percentage.description}
                  />
                </Form.Group>
                    <div className='d-flex align-items-center'>
                <button type="button" class="close" aria-label="Close"
                onClick={(e) => this.deleteRow(e,'percentages',index)}
                >
                 <span aria-hidden="true">&times;</span>
              </button>
              </div>
              </Form.Row>

            
            );
          })}
         <Button onClick={(e) => this.addRow(e,'percentages')}>Add</Button>

        </Form>
        <div> &nbsp;&nbsp;</div> 

        <ButtonToolbar className="d-flex bd-highlight">

        <Button className="p-2 flex-fill bd-highlight" variant="success" onClick={this.applyChanges.bind(this)}>Apply Changes</Button>
        <Button className="p-2 flex-fill bd-highlight" variant="light" onClick={this.cancelChanges.bind(this)}>Cancel</Button>

        </ButtonToolbar>


      </div>
    );
  }
}

export default AdminEditLaws;
