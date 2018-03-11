import React from "react";
import axios from "axios";
import SelectDinamic from "./SelectDinamic";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

export default class CreatePostForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
    this.getTypes = this.getTypes.bind(this);

    this.state = {
      title: "",
      content: "",
      type: {
        type: "IMPORTANT"
      },
      types: []
    };
  }

  componentDidMount() {
    this.getTypes();
  }

  getTypes() {
    axios.get(`http://localhost:8080/type/`).then(res => {
      const types = res.data;
      this.setState({ types: types });
    });
  }

  // Handle changes to the form and update the value in the stage

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  }

  // stackoverflow : how-do-i-setstate-for-nested-array
  handleChangeType(event) {
    let type = Object.assign({}, this.state.type); //creating copy of object
    type.type = event.target.value; //updating value
    this.setState({ type });
  }

  handleSubmit(event) {
    const insertPost = this.props.insertPost;
    event.preventDefault();
    const post = {
      title: this.state.title,
      content: this.state.content,
      type: {
        type: this.state.type.type
      }
    };
    insertPost(post);
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <h5>The next next part will be a form to POST REST WEBAPI</h5>
        <FormGroup>
          <Label>Title</Label>
          <Input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Content</Label>
          <Input
            type="textarea"
            name="content"
            value={this.state.content}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Type</Label>
          <SelectDinamic
            types={this.state.types}
            handleChangeType={this.handleChangeType.bind(this)}
          />
        </FormGroup>
        <Button type="submit" value="Submit">
          Submit
        </Button>
      </Form>
    );
  }
}
