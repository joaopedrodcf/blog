import Post from "./Post";
import React from "react";
import { Col, Row } from "reactstrap";

export default class Posts extends React.Component {
  render() {
    const { posts, deletePost } = this.props;

    return (
      <Row>
        <Row>
          <Col sm="12">
            <h5>All Posts</h5>
          </Col>
        </Row>
        <Row>
          {posts.map(post => (
            <Col key={post.id} sm="2">
              <Post post={post} deletePost={deletePost} />
            </Col>
          ))}
        </Row>
      </Row>
    );
  }
}
