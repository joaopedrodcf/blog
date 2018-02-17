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
              title={post.title}
              content={post.content}
              postType={post.postType}
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
      <div className="postType">{props.postType}</div>
      <br />
    </div>
  );
}

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: "rerwer", content: "sdsadsad", postType: "REGULAR" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      title: event.target.value.title,
      content: event.target.value.content,
      postType: event.target.value.postType
    });
  }

  handleSubmit = event => {
    event.preventDefault();

    const post = {
      title: this.state.title,
      content: this.state.content,
      postType: this.state.postType
    };
    console.log(JSON.stringify(post));

    const jsonPost = JSON.stringify(post);

    axios.post(`http://localhost:8080/post/`, { jsonPost }).then(res => {
      console.log(res);
      console.log(res.data);
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Text:
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
            name="postType"
            value={this.state.postType}
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
