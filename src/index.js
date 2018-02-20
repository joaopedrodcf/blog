import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

// -------------------------This is the main App--------------------------------
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

  // CRUD for use in the components
  getPosts() {
    axios.get(`http://localhost:8080/post/`).then(res => {
      const posts = res.data;
      console.log(res);
      console.log(res.data);
      this.setState({ posts: posts });
    });
  }

  deletePost(id) {
    axios.delete(`http://localhost:8080/post/${id}`).then(res => {
      // here need to fetch again the posts from the webapp
      console.log(res);
      console.log(res.data);
      this.getPosts();
    });
  }

  createPost(post) {
    axios
      .post(`http://localhost:8080/post/`, {
        title: post.title,
        content: post.content,
        type: post.type
      })
      .then(res => {
        this.getPosts();
        console.log(res);
        console.log(res.data);
      });
  }

  searchPosts(query) {
    let posts = this.state.posts.filter(post => {
      console.log(post.title.includes(query));
      console.log(post.content.includes(query));
      return post.title.includes(query) || post.content.includes(query);
    });
    this.setState({ posts: posts });
  }

  render() {
    return (
      <div>
        <div>These are all the posts</div>
        <Posts
          posts={this.state.posts}
          deletePost={this.deletePost.bind(this)}
        />
        <br />

        <SearchPosts searchPosts={this.searchPosts.bind(this)} />
        <div>The next next part will be a form to POST REST WEBAPI</div>
        <CreatePostForm insertPost={this.createPost.bind(this)} />
      </div>
    );
  }
}

class Posts extends React.Component {
  render() {
    return (
      <div>
        {this.props.posts.map(post => (
          <Post key={post.id} post={post} deletePost={this.props.deletePost} />
        ))}
      </div>
    );
  }
}

class Post extends React.Component {
  render() {
    // For some reason is important the () => , still need to research more
    return (
      <div>
        <span className="title">{this.props.post.title}</span>
        <span className="content">{this.props.post.content}</span>
        <span className="type">{this.props.post.type}</span>
        <br />
        <button onClick={() => this.props.deletePost(this.props.post.id)}>
          delete
        </button>
      </div>
    );
  }
}

class CreatePostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: "", content: "", type: "REGULAR" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Handle changes to the form and update the value in the stage
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const post = {
      title: this.state.title,
      content: this.state.content,
      type: this.state.type
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
          onChange={this.handleChange}
        >
          <option value="REGULAR">REGULAR</option>
          <option value="IMPORTANT">IMPORTANT</option>
          <option value="FLASHNEWS">FLASHNEWS</option>
        </select>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

class SearchPosts extends React.Component {
  handleSearch(event) {
    this.props.searchPosts(event.target.value);
  }

  render() {
    return (
      <div>
        <input type="text" onKeyUp={this.handleSearch.bind(this)} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
