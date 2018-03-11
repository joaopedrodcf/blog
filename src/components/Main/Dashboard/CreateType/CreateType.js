import React from "react";
import axios from "axios";
import SelectDinamic from "./SelectDinamic";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

export default class CreatePostForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label>Title</Label>
          <Input
            type="text"
            name="type"
            value={this.state.type}
            onChange={this.handleChange}
          />
        </FormGroup>
      </Form>
    );
  }
}
