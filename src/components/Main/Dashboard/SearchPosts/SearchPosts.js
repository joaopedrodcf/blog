import React from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";

export default class SearchPosts extends React.Component {
  handleSearch(event) {
    this.props.searchPosts(event.target.value);
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label>Search:</Label>
          <Input type="text" onKeyUp={this.handleSearch.bind(this)} />
        </FormGroup>
      </Form>
    );
  }
}
