import SelectTypes from './SelectTypes';
import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

export default class CreatePostForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);

    this.state = {
      title: '',
      description: '',
      content: '',
      image: '',
      type: {
        name: 'Important',
      },
    };
  }

  // Handle changes to the form and update the value in the stage

  handleChange(event) {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
    });
  }

  // stackoverflow : how-do-i-setstate-for-nested-array
  handleChangeType(event) {
    let type = Object.assign({}, this.state.name); //creating copy of object
    type.name = event.target.value; //updating value
    this.setState({ type });
  }

  handleSubmit(event) {
    const { insertPost } = this.props;
    event.preventDefault();
    const post = {
      title: this.state.title,
      content: this.state.content,
      description: this.state.description,
      image: this.state.image,
      type: {
        name: this.state.type.name,
      },
    };

    insertPost(post);
  }

  render() {
    const types = this.props.types;
    return (
      <Form onSubmit={this.handleSubmit}>
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
          <Label>Description</Label>
          <Input
            type="textarea"
            name="description"
            value={this.state.description}
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
          <Label>Image url</Label>
          <Input
            type="text"
            name="image"
            value={this.state.image}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Type</Label>
          <SelectTypes
            types={types}
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
