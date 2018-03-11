import React from "react";
import axios from "axios";
import CreatePostForm from "./CreatePostForm";
import SearchPosts from "./SearchPosts";
import Posts from "./Posts";
import { Row, Col } from "reactstrap";
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
        <Row>
          <Col sm="12" md={{ size: 8, offset: 2 }}>
            <h5>These are all the posts</h5>
          </Col>
        </Row>
        <Posts
          posts={this.state.posts}
          deletePost={this.deletePost.bind(this)}
        />
        <br />
        <Row>
          <Col sm="12" md={{ size: 8, offset: 2 }}>
            <SearchPosts searchPosts={this.searchPosts.bind(this)} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col sm="12" md={{ size: 8, offset: 2 }}>
            <CreatePostForm insertPost={this.createPost.bind(this)} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
