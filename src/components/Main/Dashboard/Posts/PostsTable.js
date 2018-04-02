import PostRow from "./PostRow";
import React from "react";
import { Col, Row, Table } from "reactstrap";

export default class PostsTable extends React.Component {
  render() {
    const { posts, deletePost } = this.props;
    return (
      <Row>
        <Col>
          <Row>
            <Col>
              <h3> All Posts </h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table responsive dark>
                <thead>
                  <tr>
                    <th> Title </th> <th> Description </th> <th> Type </th>
                    <th> Show more </th> <th> Delete </th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map(post => (
                    <PostRow post={post} deletePost={deletePost} />
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
