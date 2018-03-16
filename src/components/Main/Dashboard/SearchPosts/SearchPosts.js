import React from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";

export default class SearchPosts extends React.Component {
  handleSearch(event) {
    this.props.searchPosts(event.target.value);
  }

  render() {
    const types = this.props.types;
    return (
      <Form onSubmit={this.handleSubmit}>
        <h5>Filter Posts</h5>
        <FormGroup>
          <Label>Search:</Label>
          <Input type="text" onKeyUp={this.handleSearch.bind(this)} />
        </FormGroup>
        {types.map(type => (
          <FormGroup check key={type.id}>
            <Label check>
              <Input
                type="checkbox"
                value={type.name}
                onChange={this.handleSearch.bind(this)}
              />
              {type.name}
            </Label>
          </FormGroup>
        ))}
      </Form>
    );
  }
}
