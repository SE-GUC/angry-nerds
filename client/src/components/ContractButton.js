import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import axios from 'axios'
import { FaRegFileAlt } from "react-icons/fa";
import { IconContext } from "react-icons";

export class ContractButton extends Component {

  state = {
      pdfString: '#',
      loaded: false
  }

  componentDidMount(){
    axios.get('http://localhost:3000/generatePdf/' + this.props.id)
        .then(res => this.setState({pdfString: res.data.data, loaded:true}))
        .catch(err => console.log(err))
  }

  render() {
    if(this.state.loaded)  {
    return (
      <Button
        download
        variant="success"
        style={{width: '105px'}}
        href = {this.state.pdfString}
      >
        <IconContext.Provider
          value={{
            className: "float-left",
            color: "white"
          }}
        >
          <div>
            <FaRegFileAlt />
          </div>
        </IconContext.Provider>
        Contract
      </Button>
    )
    }
    else{
        return (
            <Button
              download
              disabled
              variant="success"
              style={{width: '105px'}}
              href = {this.state.pdfString}
            >
              <IconContext.Provider
                value={{
                  className: "float-left",
                  color: "white"
                }}
              >
                <div>
                  <FaRegFileAlt />
                </div>
              </IconContext.Provider>
              Contract
            </Button>
          )
    }
  }
}

export default ContractButton;
