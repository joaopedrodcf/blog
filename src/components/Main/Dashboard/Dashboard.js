import React from "react";
import axios from "axios";
import SearchPosts from "./SearchPosts/SearchPosts";
import Posts from "./Posts/Posts";
import { Row, Col, Container } from "reactstrap";
import SidebarRight from "./SidebarRight";

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
        image: post.image,
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
      const postTypeInsensitive = post.type.name.toLowerCase();
      return (
        postTitleInsensitive.includes(queryInsensitive) ||
        postContentInsensitive.includes(queryInsensitive) ||
        postTypeInsensitive.includes(queryInsensitive)
      );
    });
    this.setState({ posts: posts });
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col sm="2">
            <SidebarRight
              types={this.state.types}
              insertPost={this.createPost.bind(this)}
              insertType={this.createType.bind(this)}
            />
          </Col>
          <Col sm="8">
            <Row>
              <Col sm="12">
                <h5>All Posts</h5>
              </Col>
            </Row>
            <Posts
              posts={this.state.posts}
              deletePost={this.deletePost.bind(this)}
            />
          </Col>
          <Col sm="2">
            <Row>
              <Col>
                <SearchPosts
                  types={this.state.types}
                  searchPosts={this.searchPosts.bind(this)}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
