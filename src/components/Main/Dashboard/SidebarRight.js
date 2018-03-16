import React from "react";
import { Row, Col } from "reactstrap";
import CreateType from "./CreateType/CreateType";
import CreatePostForm from "./CreatePostForm/CreatePostForm";

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
