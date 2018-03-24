import Post from "./Post";
import React from "react";
import { Col, Row, CardGroup } from "reactstrap";

export default class Posts extends React.Component {
  render() {
    const { posts } = this.props;
    const { children, size } = this.props;
    return (
      <Row>
        <Row>
          <Col>
            <h3>All Posts</h3>
          </Col>
        </Row>
        <Row>
          {posts.map(post => (
            <Col key={post.id} sm={size}>
              <CardGroup>
                <Post post={post}>{children}</Post>
              </CardGroup>
            </Col>
          ))}
        </Row>
      </Row>
    );
  }
}
