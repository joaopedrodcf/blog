import React from "react";
import {
  Col,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Container,
  ModalFooter
} from "reactstrap";
import CreateTypeForm from "./CreateTypeForm/CreateTypeForm";

export default class CreatePostModal extends React.Component {
  constructor(props) {
    super(props);

    this.toggleCreateType = this.toggleCreateType.bind(this);

    this.state = {
      modalCreateType: false
    };
  }

  toggleCreateType() {
    this.setState({
      modalCreateType: !this.state.modalCreateType
    });
  }

  render() {
    const { insertType, types } = this.props;
    return (
      <div>
        <Button
          color="secondary"
          onClick={this.toggleCreateType}
          className="margin-bottom-button"
        >
          Create type
        </Button>
        <Modal
          isOpen={this.state.modalCreateType}
          toggle={this.toggleCreateType}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggleCreateType}>Create Type</ModalHeader>
          <ModalBody>
            <Container fluid>
              <Row>
                <Col>
                  <CreateTypeForm insertType={insertType} />
                </Col>
              </Row>
            </Container>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleCreateType}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
