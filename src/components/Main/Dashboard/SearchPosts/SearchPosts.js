import React from "react";
import { Form, FormGroup, Input, Label, Row, Col } from "reactstrap";

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
    const { searchPosts } = this.props;

    this.setState(
      { text: value },
      function() {
        searchPosts(this.state);
      }.bind(this)
    );
  }

  handleSearchType(event) {
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
    let typesState = this.state.types;
    return (
      <Form onSubmit={this.handleSubmit} inline>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label>Search:</Label>
          <Input type="text" onKeyUp={this.handleSearch.bind(this)} />
        </FormGroup>
        {types.map(type => (
          <FormGroup check key={type.id} className="mb-2 mr-sm-2 mb-sm-0">
            <Label check>
              <Input
                type="checkbox"
                checked={typesState.includes(type.name)}
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
