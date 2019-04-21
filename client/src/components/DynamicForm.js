import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Alert, Row } from "reactstrap";
import axios from "axios";

export class DynamicForm extends Component {
  state = {
    alert: false,
    alertMessage: "",
    case: {},
    success:false
  };

  constructor(props) {
    super(props);
  }

  async handleSubmit(event) {
    event.preventDefault();

    const body = this.state.case;
    body.form_type = this.props.form_type;
    body.managers = [];

    try {
      this.setState({
        alert: false
      });
      const request = await axios.post(
        "http://localhost:3000/InvestorFillForm",
        body
      );
      this.setState({
        success:true
      })
    } catch (e) {
      const error = e.response.data;
      let message = "";
      for (let i = 0; i < Object.keys(error).length; i++) {
        message =
          message + "" + (i + 1) + ")" + error[Object.keys(error)[i]] + "\n";
      }
      if (this.props.form_type == "SSC" || "SPC")
        this.setState({
          alert: true,
          alertMessage: message
        });
    }
  }

  handleChange(event) {
    let _case = this.state.case;
    _case[event.target.name] = event.target.value;
    this.setState({
      case: _case
    });
  }

  arrayChange(event) {
    //fields[0] field name - fields[1] array index - fields[2] entity ie. managers
    let values = event.target.name.split("-");
    let _case = this.state.case;
    if (!_case[values[2]]) {
      _case[values[2]] = [];
    }

    for (let i = _case[values[2]].length; i <= values[1]; i++) {
      _case[values[2]].push({});
    }
    _case[values[2]][values[1]][values[0]] = event.target.value;

    this.setState({
      case: _case
    });
  }

  increment(event) {
    this.setState({
      [event.target.key]: event.target.key + 1
    });
  }

  renderForm() {
    let model = this.props.model;

    let formUI = model.map(m => {
      let multiple = m.multiple || false;
      let counter = -1;
      const ddItem = {
        width: 500
      };

      let inputt = <h1 />;

      if (multiple) {
        let size = 0;
        this.props.formModel.map(e => {
          if (e.name == m.name) {
            size = e.fields.length;
          }
        });

        let counter = -1;
        let number;
        let input = m.fields.map(attribute => {
          let key = attribute.key;
          let type = attribute.type || "text";
          let props = attribute.props || {};
          counter++;
          return (
            <Row>
              <div className="col-xs-5">
                <Label
                  name={key + "-" + Math.floor(counter / size) + "-" + m.name}
                  key={"l" + key + counter}
                >
                 {Math.floor(counter / size)}. {key}
                </Label>
                <Input
                  className="form-input"
                  style={ddItem}
                  name={key + "-" + Math.floor(counter / size) + "-" + m.name}
                  type={type}
                  {...props}
                  key={"i" + key + counter}
                  onChange={this.arrayChange.bind(this)}
                />
              </div>
              <br />
            </Row>
          );
        });

        inputt = (
          <div>
            <Label>{m.name}</Label>
            {input}
            <div>
              <Button
                onClick={e => {
                  e.preventDefault();
                  this.props.addField(m.name);
                }}
              >
                {" "}
                Add {m.name}
              </Button>
            </div>
          </div>
        );
      } else {
        let key = m.key;
        let label = m.label;
        let type = m.type || "text";
        let props = m.props || {};

        inputt = (
          <Row>
            <div className="col-xs-5">
              <Input
                className="form-input"
                style={ddItem}
                autoComplete="off"
                name={key}
                type={type}
                {...props}
                key={"i" + key}
                onChange={this.handleChange.bind(this)}
              />
            </div>
            <br />
          </Row>
        );
      }

      return (
        <div class="w-25 p-3">
          <FormGroup>
            <label className="label label-primary" for="ex2" style={{fontWeight: 'bold'}}>
              {m.label}:
            </label>
            {inputt}
          </FormGroup>
        </div>
      );
    });
    return formUI;
  }

  onDismiss() {
    this.setState({
      alert: false
    });
  }

  dismissSuccess() {
    this.setState({
      success: false
    });
  }

  render() {
    return (
      <div>
        <fieldset class="the-fieldset">
          <legend className="the-legend">Fill The Application Form Below</legend>
          <Form onSubmit={this.handleSubmit.bind(this)}>
            {this.renderForm()}
            <Alert
              color="danger"
              isOpen={this.state.alert}
              toggle={this.onDismiss.bind(this)}
            >
              {this.state.alertMessage}
            </Alert>
            <Alert
          color="success"
          isOpen={this.state.success}
          toggle={this.dismissSuccess.bind(this)}
        >
          You've Successfully filled the application to establish a company. <br/>
          Your application will be processed by our employess and you will be notified <br/>
          through email when you are required to pay the registration fees.
        </Alert>
            <Button
              style={{
                backgroundColor: "#286090",
                float: "right",
                padding: "10px"
              }}
            >
              Submit Form
            </Button>
          </Form>
        </fieldset>
      </div>
    );
  }
}

export default DynamicForm;
