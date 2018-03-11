import React from "react";
import axios from "axios";
import CreatePostForm from "./CreatePostForm/CreatePostForm";
import SearchPosts from "./SearchPosts/SearchPosts";
import Posts from "./Posts/Posts";
import { Row, Col, Container } from "reactstrap";
// -------------------------This is the main App--------------------------------
export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.getPosts = this.getPosts.bind(this);

    this.state = {
      posts: [],
      initialPosts: []
    };
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
      <Container fluid>
        <Row>
          <Col sm="2">This is the sidebar</Col>
          <Col sm="8">
            <Row>
              <Col sm="12">
                <h5>These are all the posts</h5>
              </Col>
            </Row>
            <Posts
              posts={this.state.posts}
              deletePost={this.deletePost.bind(this)}
            />
            <br />

            <br />
            <Row>
              <Col sm="12">
                <CreatePostForm insertPost={this.createPost.bind(this)} />
              </Col>
            </Row>
          </Col>

          <Col sm="2">
            <Row>
              <Col>
                <SearchPosts searchPosts={this.searchPosts.bind(this)} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
