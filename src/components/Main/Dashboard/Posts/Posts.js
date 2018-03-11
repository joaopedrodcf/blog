import React from "react";
import Post from "./Post";
import { Col, Row } from "reactstrap";

export default class Posts extends React.Component {
  render() {
    const posts = this.props.posts;
    const deletePost = this.props.deletePost;

    return (
      <Row>
        {posts.map(post => (
          <Col key={post.id} sm="2" md={{ size: 2, moffset: 1 }}>
            <Post post={post} deletePost={deletePost} />
          </Col>
        ))}
      </Row>
    );
  }
}
