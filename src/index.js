import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

// This is the main App
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:8080/post/`).then(res => {
      const posts = res.data;
      this.setState({ posts });
    });
  }

  render() {
    return (
      <div>
        <div>
          The following information is retrieved from the GET ALL REST WEBAPI
        </div>
        <div>
          {this.state.posts.map(post => (
            <Post
              key={post.id}
              title={post.title}
              content={post.content}
              type={post.type}
            />
          ))}
        </div>
        <br />
        <div>The next next part will be a form to POST REST WEBAPI</div>
        <div>
          <NameForm />
        </div>
      </div>
    );
  }
}

function Post(props) {
  return (
    <div>
      <div className="title">{props.title}</div>
      <div className="content">{props.content}</div>
      <div className="type">{props.type}</div>
      <br />
    </div>
  );
}

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: "", content: "sdsadsad", type: "REGULAR" };

    // needs to bind every function
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // the follwing funcions update the state of the variables
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state.title, this.state.content, this.state.type);
    axios
      .post(`http://localhost:8080/post/`, {
        title: this.state.title,
        content: this.state.content,
        type: this.state.type
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <br />
        <label>
          Content:
          <textarea
            name="content"
            value={this.state.content}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <br />
        <label>
          Type:
          <select
            name="type"
            value={this.state.type}
            onChange={this.handleChange}
          >
            <option value="REGULAR">REGULAR</option>
            <option value="IMPORTANT">IMPORTANT</option>
            <option value="FLASHNEWS">FLASHNEWS</option>
          </select>
        </label>
        <br />
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
