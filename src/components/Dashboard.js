import React from "react";
import axios from "axios";
import CreatePostForm from "./CreatePostForm";
import SearchPosts from "./SearchPosts";
import Posts from "./Posts";

// -------------------------This is the main App--------------------------------
class Dashboard extends React.Component {
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
        <h5>These are all the posts</h5>
        <Posts
          posts={this.state.posts}
          deletePost={this.deletePost.bind(this)}
        />
        <br />
        <h5>Search:</h5>
        <SearchPosts searchPosts={this.searchPosts.bind(this)} />
        <h5>The next next part will be a form to POST REST WEBAPI</h5>
        <CreatePostForm insertPost={this.createPost.bind(this)} />
      </div>
    );
  }
}

export default Dashboard;
