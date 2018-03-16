import CreatePostForm from "./CreatePostForm/CreatePostForm";

import CreateType from "./CreateType/CreateType";
import React from "react";
import { Col, Row } from "reactstrap";

export default class SidebarRight extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <Col sm="12">
            <CreatePostForm
              types={this.props.types}
              insertPost={this.props.insertPost}
            />
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <CreateType insertType={this.props.insertType} />
          </Col>
        </Row>
      </div>
    );
  }
}
