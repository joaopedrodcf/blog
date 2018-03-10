import React from "react";
import axios from "axios";
import SelectDinamic from "./SelectDinamic";

class CreatePostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      type: {
        type: "IMPORTANT"
      },
      types: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
    this.getTypes = this.getTypes.bind(this);
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
        <SelectDinamic
          types={this.state.types}
          handleChangeType={this.handleChangeType.bind(this)}
        />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default CreatePostForm;
