import Posts from "../Posts/Posts";
import DeleteButton from "../Posts/DeleteButton";
import SearchPosts from "./SearchPosts/SearchPosts";
import SidebarRight from "./SidebarRight";

import axios from "axios";
import React from "react";
import { Col, Container, Row } from "reactstrap";

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
        description: post.description,
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

  searchPosts(filters) {
    // This part is important post
    const text = filters.text;
    const types = filters.types;
    console.log(types);
    axios
      .post(`http://localhost:8080/post/filter`, types, {
        params: {
          name: text
        }
      })
      .then(res => {
        const posts = res.data;
        this.setState({ posts: posts });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <Container fluid className="flex-fill">
        <Row>
          <Col sm="3">
            <SidebarRight
              types={this.state.types}
              insertPost={this.createPost.bind(this)}
              insertType={this.createType.bind(this)}
            />
          </Col>
          <Col md="6" sm="10">
            <Posts posts={this.state.posts}>
              <DeleteButton deletePost={this.deletePost.bind(this)} />
            </Posts>
          </Col>
          <Col sm="3">
            <SearchPosts
              types={this.state.types}
              searchPosts={this.searchPosts.bind(this)}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}
