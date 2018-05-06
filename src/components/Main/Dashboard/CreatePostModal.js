import React from 'react';
import {
  Col,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Container,
  ModalFooter,
} from 'reactstrap';
import CreatePostForm from './CreatePostForm/CreatePostForm';

export default class CreatePostModal extends React.Component {
  constructor(props) {
    super(props);

    this.toggleCreatePost = this.toggleCreatePost.bind(this);

    this.state = {
      modalCreatePost: false,
    };
  }

  toggleCreatePost() {
    this.setState({
      modalCreatePost: !this.state.modalCreatePost,
    });
  }

  render() {
    const { insertPost, types } = this.props;
    return (
      <div>
        <Button
          color="secondary"
          onClick={this.toggleCreatePost}
          className="margin-bottom-button"
        >
          Create Post
        </Button>
        <Modal
          isOpen={this.state.modalCreatePost}
          toggle={this.toggleCreatePost}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Create Post</ModalHeader>
          <ModalBody>
            <Container fluid>
              <Row>
                <Col>
                  <CreatePostForm types={types} insertPost={insertPost} />
                </Col>
              </Row>
            </Container>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleCreatePost}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
