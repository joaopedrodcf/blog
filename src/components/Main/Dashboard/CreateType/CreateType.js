import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

export default class CreateType extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      name: ""
    };
  }

  handleSubmit(event) {
    const insertType = this.props.insertType;
    event.preventDefault();

    const type = {
      name: this.state.name
    };

    this.setState({
      name: ""
    });
    console.log(type);
    insertType(type);
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <h5>Create new types</h5>
        <FormGroup>
          <Label>Type</Label>
          <Input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </FormGroup>
        <Button type="submit" value="Submit">
          Submit
        </Button>
      </Form>
    );
  }
}
