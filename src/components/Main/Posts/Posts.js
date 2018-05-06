import Post from './Post';
import React from 'react';
import { Col, Row, CardGroup } from 'reactstrap';

export default class PostsTable extends React.Component {
  render() {
    const { posts } = this.props;
    return (
      <Row>
        {posts.map(post => (
          <Col key={post.id} sm="12" md="12">
            <CardGroup className="cardGroup">
              <Post post={post} />
            </CardGroup>
          </Col>
        ))}
      </Row>
    );
  }
}
