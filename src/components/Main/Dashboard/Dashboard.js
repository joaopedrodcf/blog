import React from "react";
import axios from "axios";
import CreatePostForm from "./CreatePostForm/CreatePostForm";
import SearchPosts from "./SearchPosts/SearchPosts";
import CreateType from "./CreateType/CreateType";
import Posts from "./Posts/Posts";
import { Row, Col, Container } from "reactstrap";
// -------------------------This is the main App--------------------------------
export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.getPosts = this.getPosts.bind(this);

    this.state = {
      posts: [],
      initialPosts: [],
      types: []
    };
  }

  componentDidMount() {
    this.getPosts();
    this.getTypes();
  }

  // CRUD for use in the components
  getPosts() {
    axios.get(`http://localhost:8080/post/`).then(res => {
      const posts = res.data;
      console.log(posts);
      this.setState({ posts: posts, initialPosts: posts });
    });
  }

  getTypes() {
    axios.get(`http://localhost:8080/type/`).then(res => {
      const types = res.data;
      this.setState({ types: types });
    });
  }

  deletePost(id) {
    axios.delete(`http://localhost:8080/post/${id}`).then(res => {
      // here need to fetch again the posts from the webapp
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
          name: post.type.name
        }
      })
      .then(res => {
        this.getPosts();
      });
  }

  createType(type) {
    console.log(type);
    axios
      .post(`http://localhost:8080/type/`, {
        name: type.name
      })
      .then(res => {
        this.getTypes();
      });
  }

  searchPosts(query) {
    let posts = this.state.initialPosts.filter(post => {
      const queryInsensitive = query.toLowerCase();
      const postTitleInsensitive = post.title.toLowerCase();
      const postContentInsensitive = post.content.toLowerCase();

      return (
        postTitleInsensitive.includes(queryInsensitive) ||
        postContentInsensitive.includes(queryInsensitive)
      );
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
            <Row>
              <Col sm="12">
                <CreatePostForm
                  types={this.state.types}
                  insertPost={this.createPost.bind(this)}
                />
              </Col>
            </Row>
            <Row>
              <Col sm="12">
                <CreateType insertType={this.createType.bind(this)} />
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
