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
    this.getPosts = this.getPosts.bind(this);
  }

  componentDidMount() {
    this.getPosts();
  }

  getPosts() {
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
              id={post.id}
              title={post.title}
              content={post.content}
              type={post.type}
              getPosts={() => this.getPosts()}
            />
          ))}
        </div>
        <br />
        <div>The next next part will be a form to POST REST WEBAPI</div>
        <div>
          <NameForm getPosts={() => this.getPosts()} />
        </div>
      </div>
    );
  }
}

class Post extends React.Component {
  constructor(props) {
    super(props);
    // needs to bind every function
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleDelete = event => {
    event.preventDefault();

    axios.delete(`http://localhost:8080/post/${this.props.id}`).then(res => {
      // here need to fetch again the posts from the webapp
      this.props.getPosts();
    });
  };

  handleUpdate = event => {
    event.preventDefault();

    axios
      .put(`http://localhost:8080/post/${this.props.id}`, {
        title: this.props.title,
        content: this.props.content,
        type: this.props.type
      })
      .then(res => {
        // here need to fetch again the posts from the webapp
        this.props.getPosts();
      });
  };

  render() {
    return (
      <div>
        <div className="title">{this.props.title}</div>
        <div className="content">{this.props.content}</div>
        <div className="type">{this.props.type}</div>
        <br />
        <button onClick={this.handleDelete}>delete</button>
        <button onClick={this.handleUpdate}>update</button>
      </div>
    );
  }
}

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: "", content: "", type: "REGULAR" };

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
        this.props.getPosts();
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
