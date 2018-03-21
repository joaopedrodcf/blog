import React from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";

export default class SearchPosts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      types: []
    };
  }

  handleSearch(event) {
    const { value } = event.target;

    this.setState(
      { text: value },
      function() {
        this.props.searchPosts(this.state);
      }.bind(this)
    );
  }

  handleSearchType(event) {
    console.log(this.state);
    const { value, checked } = event.target;
    var types = this.state.types.slice();
    let index;

    if (checked) {
      types.push(value);
    } else {
      index = types.indexOf(value);
      types.splice(index, 1);
    }

    // callback function
    // solution : https://stackoverflow.com/questions/38558200/react-setstate-not-updating-immediately
    this.setState(
      { types: types },
      function() {
        this.props.searchPosts(this.state);
      }.bind(this)
    );
  }

  render() {
    const { types } = this.props;
    return (
      <Form onSubmit={this.handleSubmit}>
        <h3> Filter Posts</h3>
        <FormGroup>
          <Label>Search:</Label>
          <Input type="text" onKeyUp={this.handleSearch.bind(this)} />
        </FormGroup>
        {types.map(type => (
          <FormGroup check key={type.id}>
            <Label check>
              <Input
                type="checkbox"
                checked={this.state.types.includes(type.name)}
                value={type.name}
                onChange={this.handleSearchType.bind(this)}
              />
              {type.name}
            </Label>
          </FormGroup>
        ))}
      </Form>
    );
  }
}
