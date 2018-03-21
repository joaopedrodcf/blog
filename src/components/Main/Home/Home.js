import React from "react";
import { Col, Container, Row } from "reactstrap";
import axios from "axios";
import Posts from "./Posts";
export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.getPosts = this.getPosts.bind(this);

    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    this.getPosts();
  }

  // CRUD for use in the components
  getPosts() {
    axios.get(`http://localhost:8080/post/`).then(res => {
      const posts = res.data;
      console.log(posts);
      this.setState({ posts: posts });
    });
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col sm="2">This is the sidebar</Col>
          <Col sm="8">
            <Posts posts={this.state.posts} />
          </Col>
          <Col sm="2">This is the sidebar</Col>
        </Row>
      </Container>
    );
  }
}
