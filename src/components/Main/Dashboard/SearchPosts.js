import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

class SearchPosts extends React.Component {
  handleSearch(event) {
    this.props.searchPosts(event.target.value);
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <h5>Search:</h5>
          <Input type="text" onKeyUp={this.handleSearch.bind(this)} />
        </FormGroup>
      </Form>
    );
  }
}

export default SearchPosts;
