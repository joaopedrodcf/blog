import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import CreatePostForm from "./components/CreatePostForm";
import SearchPosts from "./components/SearchPosts";
import Posts from "./components/Posts";

// -------------------------This is the main App--------------------------------
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      initialPosts: []
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
      this.setState({ posts: posts, initialPosts: posts });
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
        type: {
          id: post.type.id,
          type: post.type.type
        }
      })
      .then(res => {
        this.getPosts();
        console.log(res);
        console.log(res.data);
      });
  }

  searchPosts(query) {
    let posts = this.state.initialPosts.filter(post => {
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

ReactDOM.render(<App />, document.getElementById("root"));
