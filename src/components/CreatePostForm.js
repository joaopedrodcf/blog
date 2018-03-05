import React from "react";
import ReactDOM from "react-dom";

class CreatePostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      type: {
        type: "IMPORTANT"
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
  }

  // Handle changes to the form and update the value in the stage

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // stackoverflow : how-do-i-setstate-for-nested-array
  handleChangeType(event) {
    let type = Object.assign({}, this.state.type); //creating copy of object
    type.type = event.target.value; //updating value
    this.setState({ type });
  }

  handleSubmit(event) {
    event.preventDefault();
    const post = {
      title: this.state.title,
      content: this.state.content,
      type: {
        type: this.state.type.type
      }
    };
    this.props.insertPost(post);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
        />
        <textarea
          name="content"
          value={this.state.content}
          onChange={this.handleChange}
        />
        <select
          name="type"
          value={this.state.type}
          onChange={this.handleChangeType}
        >
          <option value="IMPORTANT">IMPORTANT</option>
          <option value="REGULAR">REGULAR</option>
          <option value="FLASHNEWS">FLASHNEWS</option>
        </select>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default CreatePostForm;
