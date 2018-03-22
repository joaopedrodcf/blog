import Post from "./Post";
import React from "react";
import { Col, Row } from "reactstrap";

export default class Posts extends React.Component {
  render() {
    const { posts } = this.props;

    return (
      <Row>
        <Row>
          <h3>All Posts</h3>
        </Row>
        <Row>
          {posts.map(post => (
            <Col key={post.id} md="6" sm="12">
              <Post post={post} />
              <br />
            </Col>
          ))}
        </Row>
      </Row>
    );
  }
}
