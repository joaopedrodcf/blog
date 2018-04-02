import PostsTable from "./Posts/PostsTable";
//import DeleteButton from "../Posts/DeleteButton";
import SearchPosts from "./SearchPosts/SearchPosts";
import SidebarRight from "./SidebarRight";
import Api from "../../Api/Api";

import axios from "axios";
import React from "react";
import { Col, Container, Row, Button } from "reactstrap";

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

    this.Api = new Api();
    this.urlPost = `http://localhost:8080/post/`;
    this.urlType = `http://localhost:8080/type/`;
  }

  componentDidMount() {
    this.getPosts();
    this.getTypes();
  }

  // CRUD for use in the components
  getPosts() {
    axios.get(this.urlPost).then(res => {
      const posts = res.data;
      this.setState({ posts: posts, initialPosts: posts });
    });
  }

  getTypes() {
    axios.get(this.urlType).then(res => {
      const types = res.data;
      this.setState({ types: types });
    });
  }

  deletePost(id) {
    axios.delete(this.urlPost + `${id}`).then(res => {
      // here need to fetch again the posts from the webapp
      this.getPosts();
    });
  }

  createPost(post) {
    axios
      .post(this.urlPost, {
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
      .post(this.urlType, {
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
      .post(this.urlPost + `filter`, types, {
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
          <Col md="9" sm="12">
            <PostsTable
              posts={this.state.posts}
              deletePost={this.deletePost.bind(this)}
            />
          </Col>
          <Col md="3">
            <SearchPosts
              types={this.state.types}
              searchPosts={this.searchPosts.bind(this)}
            />
            <SidebarRight
              types={this.state.types}
              insertPost={this.createPost.bind(this)}
              insertType={this.createType.bind(this)}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}
